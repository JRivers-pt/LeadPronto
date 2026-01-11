import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { properties, agentCalendar } from '../data/properties.js';
import { generateResponse } from './gemini.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load the agent prompt template
const promptTemplate = fs.readFileSync(
    path.join(__dirname, '../prompts/agent.txt'),
    'utf-8'
);

/**
 * RAG Pipeline - Retrieval Augmented Generation
 * 
 * 1. RETRIEVE: Get relevant property data
 * 2. AUGMENT: Build prompt with context
 * 3. GENERATE: Call LLM for response
 */
export async function ragPipeline(leadMessage, propertyId, conversationHistory = []) {
    // 1. RETRIEVE - Get property data
    const property = retrieveProperty(propertyId);
    if (!property) {
        return {
            success: false,
            message: 'Desculpe, não encontrei informações sobre este imóvel.',
            score: 0
        };
    }

    // Get available slots
    const availableSlots = getAvailableSlots();

    // 2. AUGMENT - Build the prompt with context
    const augmentedPrompt = buildPrompt(property, availableSlots, conversationHistory);

    // 3. GENERATE - Call Gemini
    const response = await generateResponse(augmentedPrompt, leadMessage, conversationHistory);

    // Parse metadata from response
    const { cleanMessage, metadata } = parseResponseMetadata(response.message);

    return {
        success: response.success,
        message: cleanMessage,
        score: metadata.score || 50,
        intent: metadata.intent || 'unknown',
        nextAction: metadata.nextAction || 'await_response',
        isMock: response.isMock || false,
        property: {
            id: property.id,
            title: property.title,
            price: property.price
        }
    };
}

/**
 * Retrieve property by ID (simple lookup for now)
 * In production: would use vector embeddings for semantic search
 */
function retrieveProperty(propertyId) {
    return properties.find(p => p.id === propertyId);
}

/**
 * Get available slots for booking
 */
function getAvailableSlots() {
    const today = new Date();
    return agentCalendar.availableSlots
        .filter(slot => new Date(slot.date) >= today)
        .slice(0, 5) // Next 5 available days
        .map(slot => `${slot.date}: ${slot.times.join(', ')}`)
        .join('\n');
}

/**
 * Build the augmented prompt with property data
 */
function buildPrompt(property, availableSlots, history) {
    const propertyData = `
Imóvel: ${property.title}
Tipo: ${property.type}
Preço: €${property.price.toLocaleString('pt-PT')}
Área: ${property.area}m²
${property.bedrooms ? `Quartos: ${property.bedrooms}` : ''}
${property.bathrooms ? `Casas de banho: ${property.bathrooms}` : ''}
Localização: ${property.location.neighborhood}, ${property.location.city}
Morada: ${property.location.address}
Características: ${property.features.join(', ')}
Descrição: ${property.description}
  `.trim();

    const historyText = history.length > 0
        ? history.map(m => `${m.type === 'received' ? 'Lead' : 'Agente'}: ${m.text}`).join('\n')
        : 'Nenhuma conversa anterior.';

    return promptTemplate
        .replace('{property_data}', propertyData)
        .replace('{available_slots}', availableSlots || 'Contactar agente para disponibilidade')
        .replace('{conversation_history}', historyText);
}

/**
 * Parse metadata from AI response
 * Looks for: <!--PRONTO_META:{"score": 85, ...}-->
 */
function parseResponseMetadata(message) {
    const metaRegex = /<!--PRONTO_META:(.*?)-->/s;
    const match = message.match(metaRegex);

    let metadata = {};
    let cleanMessage = message;

    if (match) {
        try {
            metadata = JSON.parse(match[1]);
            cleanMessage = message.replace(metaRegex, '').trim();
        } catch (e) {
            console.error('Failed to parse metadata:', e);
        }
    }

    return { cleanMessage, metadata };
}

/**
 * Score a lead based on their message
 */
export function scoreLead(message, history = []) {
    const lowerMsg = message.toLowerCase();
    let score = 50; // Base score

    // Urgency indicators (+20)
    const urgentTerms = ['urgente', 'asap', 'esta semana', 'amanhã', 'hoje', 'já', 'imediatamente'];
    if (urgentTerms.some(term => lowerMsg.includes(term))) {
        score += 20;
    }

    // Booking intent (+15)
    const bookingTerms = ['visitar', 'agendar', 'marcar', 'ver o imóvel', 'conhecer'];
    if (bookingTerms.some(term => lowerMsg.includes(term))) {
        score += 15;
    }

    // Budget mention (+10)
    if (lowerMsg.includes('orçamento') || lowerMsg.includes('budget') || lowerMsg.includes('posso pagar')) {
        score += 10;
    }

    // Detailed questions (+5)
    const detailTerms = ['área', 'quartos', 'garagem', 'condomínio', 'escritura'];
    if (detailTerms.some(term => lowerMsg.includes(term))) {
        score += 5;
    }

    // Conversation depth (+5 per exchange, max +15)
    score += Math.min(history.length * 5, 15);

    // Cap at 100
    return Math.min(score, 100);
}

export default { ragPipeline, scoreLead };
