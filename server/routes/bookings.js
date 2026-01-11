import express from 'express';
import { bookVisit, getAvailableSlots, getBookings, cancelBooking } from '../services/booking.js';

const router = express.Router();

/**
 * GET /api/bookings
 * Get all bookings
 */
router.get('/', (req, res) => {
    const bookings = getBookings();
    res.json({
        success: true,
        bookings,
        count: bookings.length
    });
});

/**
 * GET /api/bookings/slots
 * Get available slots
 */
router.get('/slots', (req, res) => {
    const { startDate, days } = req.query;
    const slots = getAvailableSlots(startDate, days ? parseInt(days) : 7);
    res.json({
        success: true,
        slots
    });
});

/**
 * POST /api/bookings
 * Create a new booking
 */
router.post('/', (req, res) => {
    const { propertyId, leadInfo, date, time } = req.body;

    if (!propertyId || !leadInfo || !date || !time) {
        return res.status(400).json({
            error: 'Missing required fields: propertyId, leadInfo, date, time'
        });
    }

    const result = bookVisit(propertyId, leadInfo, date, time);

    if (result.success) {
        res.json({
            success: true,
            booking: result.booking,
            message: result.message
        });
    } else {
        res.status(400).json({
            success: false,
            error: result.error,
            message: result.message
        });
    }
});

/**
 * DELETE /api/bookings/:id
 * Cancel a booking
 */
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const result = cancelBooking(id);

    if (result.success) {
        res.json({ success: true, message: result.message });
    } else {
        res.status(404).json({ success: false, error: result.error });
    }
});

export default router;
