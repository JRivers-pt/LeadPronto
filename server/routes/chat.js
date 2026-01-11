import express from 'express';
import { ragPipeline, scoreLead } from '../services/rag.js';
import { parseBookingIntent, bookVisit, getAvailableSlots } from '../services/booking.js';

const router = express.Router();

// In-memory conversation storage (would be database in production)
const conversations = new Map();

/**
 * POST /api/chat
 * Main chat endpoint - RAG-powered responses
 */
router.post('/', async (req, res) => {
    try {
        const { message, propertyId, leadId, leadInfo } = req.body;

        if (!message || !propertyId) {
            return res.status(400).json({
                error: 'Missing required fields: message, propertyId'
            });
        }

        // Get or create conversation history
        const conversationKey = `${leadId || 'anonymous'}-${propertyId}`;
        let history = conversations.get(conversationKey) || [];

        // Add user message to history
        history.push({
            type: 'received',
            text: message,
            time: new Date().toISOString()
        });

        // Check for booking intent
        const bookingIntent = parseBookingIntent(message);

        // Run RAG pipeline
        const ragResult = await ragPipeline(message, propertyId, history);

        // If booking intent detected and we have enough info, try to book
        let booking = null;
        if (bookingIntent.hasBookingIntent && bookingIntent.preferredDay && bookingIntent.preferredTime && leadInfo) {
            const bookingResult = bookVisit(
                propertyId,
                leadInfo,
                bookingIntent.preferredDay,
                bookingIntent.preferredTime
            );
            if (bookingResult.success) {
                booking = bookingResult.booking;
            }
        }

        // Calculate final lead score
        const score = ragResult.score || scoreLead(message, history);

        // Add AI response to history
        history.push({
            type: 'sent',
            text: ragResult.message,
            time: new Date().toISOString(),
            isAI: true
        });

        // Store updated conversation
        conversations.set(conversationKey, history);

        // Return response
        res.json({
            success: true,
            response: {
                message: ragResult.message,
                isAI: true,
                score,
                intent: ragResult.intent,
                property: ragResult.property
            },
            booking,
            leadScore: {
                value: score,
                label: getScoreLabel(score)
            },
            conversationLength: history.length
        });

    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({
            error: 'Failed to process message',
            details: error.message
        });
    }
});

/**
 * GET /api/chat/history/:leadId/:propertyId
 * Get conversation history
 */
router.get('/history/:leadId/:propertyId', (req, res) => {
    const { leadId, propertyId } = req.params;
    const conversationKey = `${leadId}-${propertyId}`;
    const history = conversations.get(conversationKey) || [];

    res.json({
        success: true,
        history,
        messageCount: history.length
    });
});

/**
 * GET /api/chat/slots
 * Get available booking slots
 */
router.get('/slots', (req, res) => {
    const slots = getAvailableSlots();
    res.json({
        success: true,
        slots
    });
});

// Helper to get score label
function getScoreLabel(score) {
    if (score >= 80) return { emoji: '🔥', text: 'HOT', color: '#ef4444' };
    if (score >= 50) return { emoji: '⭐', text: 'WARM', color: '#f59e0b' };
    return { emoji: '❄️', text: 'COLD', color: '#3b82f6' };
}

export default router;
