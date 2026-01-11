// API Service for connecting frontend to RAG backend

const API_BASE = 'http://localhost:3001/api';

/**
 * Send a message and get AI response via RAG
 */
export async function sendMessage(message, propertyId, leadId, leadInfo = null) {
    try {
        const response = await fetch(`${API_BASE}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message,
                propertyId,
                leadId,
                leadInfo
            }),
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return {
            success: false,
            error: error.message,
            response: {
                message: 'Desculpe, ocorreu um erro. Tente novamente.',
                isAI: false
            }
        };
    }
}

/**
 * Get all properties
 */
export async function getProperties(filters = {}) {
    try {
        const params = new URLSearchParams(filters);
        const response = await fetch(`${API_BASE}/properties?${params}`);
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return { success: false, properties: [] };
    }
}

/**
 * Get a single property
 */
export async function getProperty(propertyId) {
    try {
        const response = await fetch(`${API_BASE}/properties/${propertyId}`);
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return { success: false, property: null };
    }
}

/**
 * Get available booking slots
 */
export async function getAvailableSlots() {
    try {
        const response = await fetch(`${API_BASE}/bookings/slots`);
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return { success: false, slots: [] };
    }
}

/**
 * Create a booking
 */
export async function createBooking(propertyId, leadInfo, date, time) {
    try {
        const response = await fetch(`${API_BASE}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                propertyId,
                leadInfo,
                date,
                time
            }),
        });
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Get analytics data
 */
export async function getAnalytics() {
    try {
        const response = await fetch(`${API_BASE}/analytics`);
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return { success: false, metrics: null };
    }
}

/**
 * Get all bookings
 */
export async function getBookings() {
    try {
        const response = await fetch(`${API_BASE}/bookings`);
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return { success: false, bookings: [] };
    }
}

export default {
    sendMessage,
    getProperties,
    getProperty,
    getAvailableSlots,
    createBooking,
    getAnalytics,
    getBookings
};
