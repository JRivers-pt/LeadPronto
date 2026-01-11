import { v4 as uuidv4 } from 'uuid';
import { agentCalendar } from '../data/properties.js';

// In-memory storage for bookings (would be database in production)
const bookings = [];

/**
 * Book a property visit
 */
export function bookVisit(propertyId, leadInfo, date, time) {
    // Check if slot is available
    const slot = agentCalendar.availableSlots.find(s => s.date === date);
    if (!slot || !slot.times.includes(time)) {
        return {
            success: false,
            error: 'Slot not available',
            message: 'Desculpe, esse horário já não está disponível. Posso sugerir outra hora?'
        };
    }

    // Remove time from available slots
    slot.times = slot.times.filter(t => t !== time);

    // Create booking
    const booking = {
        id: uuidv4(),
        propertyId,
        leadName: leadInfo.name,
        leadEmail: leadInfo.email,
        leadPhone: leadInfo.phone,
        date,
        time,
        status: 'confirmed',
        createdAt: new Date().toISOString()
    };

    bookings.push(booking);
    agentCalendar.bookedVisits.push(booking);

    return {
        success: true,
        booking,
        message: `Visita confirmada para ${formatDate(date)} às ${time}. Enviaremos a morada por SMS.`
    };
}

/**
 * Get available slots for a date range
 */
export function getAvailableSlots(startDate = null, days = 7) {
    const start = startDate ? new Date(startDate) : new Date();
    const end = new Date(start);
    end.setDate(end.getDate() + days);

    return agentCalendar.availableSlots
        .filter(slot => {
            const slotDate = new Date(slot.date);
            return slotDate >= start && slotDate <= end && slot.times.length > 0;
        })
        .map(slot => ({
            date: slot.date,
            formattedDate: formatDate(slot.date),
            times: slot.times,
            dayOfWeek: getDayOfWeek(slot.date)
        }));
}

/**
 * Get all bookings
 */
export function getBookings() {
    return bookings.map(b => ({
        ...b,
        formattedDate: formatDate(b.date),
        dayOfWeek: getDayOfWeek(b.date)
    }));
}

/**
 * Cancel a booking
 */
export function cancelBooking(bookingId) {
    const index = bookings.findIndex(b => b.id === bookingId);
    if (index === -1) {
        return { success: false, error: 'Booking not found' };
    }

    const booking = bookings[index];

    // Restore the slot
    const slot = agentCalendar.availableSlots.find(s => s.date === booking.date);
    if (slot) {
        slot.times.push(booking.time);
        slot.times.sort();
    }

    // Remove booking
    bookings.splice(index, 1);

    return { success: true, message: 'Booking cancelled' };
}

/**
 * Parse booking intent from message
 */
export function parseBookingIntent(message) {
    const lowerMsg = message.toLowerCase();

    // Day patterns
    const dayPatterns = {
        'hoje': 0,
        'amanhã': 1,
        'depois de amanhã': 2,
        'segunda': 'monday',
        'terça': 'tuesday',
        'quarta': 'wednesday',
        'quinta': 'thursday',
        'sexta': 'friday',
        'sábado': 'saturday',
        'domingo': 'sunday'
    };

    // Time patterns
    const timeMatch = lowerMsg.match(/(\d{1,2})[h:]?(\d{2})?/);
    let preferredTime = null;
    if (timeMatch) {
        const hour = parseInt(timeMatch[1]);
        const minutes = timeMatch[2] || '00';
        preferredTime = `${hour.toString().padStart(2, '0')}:${minutes}`;
    }

    // Morning/afternoon preference
    if (lowerMsg.includes('manhã')) {
        preferredTime = preferredTime || '10:00';
    } else if (lowerMsg.includes('tarde')) {
        preferredTime = preferredTime || '15:00';
    }

    // Check for any day mention
    let preferredDay = null;
    for (const [pattern, value] of Object.entries(dayPatterns)) {
        if (lowerMsg.includes(pattern)) {
            if (typeof value === 'number') {
                const date = new Date();
                date.setDate(date.getDate() + value);
                preferredDay = date.toISOString().split('T')[0];
            } else {
                preferredDay = value;
            }
            break;
        }
    }

    return {
        hasBookingIntent: lowerMsg.includes('visita') || lowerMsg.includes('agendar') ||
            lowerMsg.includes('marcar') || lowerMsg.includes('ver o imóvel'),
        preferredDay,
        preferredTime
    };
}

// Helper functions
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-PT', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });
}

function getDayOfWeek(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-PT', { weekday: 'long' });
}

export default {
    bookVisit,
    getAvailableSlots,
    getBookings,
    cancelBooking,
    parseBookingIntent
};
