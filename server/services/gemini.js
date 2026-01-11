import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Get the model
const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        maxOutputTokens: 1024,
    }
});

/**
 * Generate a response using Gemini
 * @param {string} systemPrompt - The system instructions
 * @param {string} userMessage - The user's message
 * @param {Array} history - Previous conversation messages
 */
export async function generateResponse(systemPrompt, userMessage, history = []) {
    try {
        // Build the full prompt
        const fullPrompt = `${systemPrompt}\n\nUser message: ${userMessage}`;

        // Convert history to Gemini format
        const chatHistory = history.map(msg => ({
            role: msg.type === 'sent' ? 'model' : 'user',
            parts: [{ text: msg.text }]
        }));

        // Start chat with history
        const chat = model.startChat({
            history: chatHistory,
        });

        // Generate response
        const result = await chat.sendMessage(fullPrompt);
        const response = result.response.text();

        return {
            success: true,
            message: response,
            usage: {
                model: 'gemini-1.5-flash'
            }
        };
    } catch (error) {
        console.error('Gemini API error:', error);

        // Fallback to mock response if API fails
        return {
            success: false,
            message: getMockResponse(userMessage),
            error: error.message,
            isMock: true
        };
    }
}

/**
 * Mock response generator for when API is unavailable
 */
function getMockResponse(userMessage) {
    const lowerMsg = userMessage.toLowerCase();

    // Booking intent
    if (lowerMsg.includes('visita') || lowerMsg.includes('agendar') || lowerMsg.includes('ver')) {
        return `Claro! Tenho disponibilidade para visitas esta semana. Prefere de manhã ou à tarde?
<!--PRONTO_META:{"score": 85, "intent": "booking", "nextAction": "collect_time"}-->`;
    }

    // Price question
    if (lowerMsg.includes('preço') || lowerMsg.includes('valor') || lowerMsg.includes('custa')) {
        return `O imóvel está listado a €485.000. O proprietário está aberto a propostas. Gostaria de agendar uma visita?
<!--PRONTO_META:{"score": 70, "intent": "price_inquiry", "nextAction": "suggest_visit"}-->`;
    }

    // Area/size question
    if (lowerMsg.includes('área') || lowerMsg.includes('metros') || lowerMsg.includes('tamanho')) {
        return `O apartamento tem 120m² de área útil, com 3 quartos e 2 casas de banho. Posso agendar uma visita para ver pessoalmente?
<!--PRONTO_META:{"score": 65, "intent": "info_request", "nextAction": "suggest_visit"}-->`;
    }

    // Default greeting
    return `Olá! Obrigado pelo seu interesse. Como posso ajudá-lo com este imóvel?
<!--PRONTO_META:{"score": 50, "intent": "greeting", "nextAction": "await_question"}-->`;
}

export default { generateResponse };
