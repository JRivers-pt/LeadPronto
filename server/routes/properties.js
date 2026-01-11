import express from 'express';
import { properties } from '../data/properties.js';

const router = express.Router();

/**
 * GET /api/properties
 * Get all properties
 */
router.get('/', (req, res) => {
    const { city, type, minPrice, maxPrice } = req.query;

    let filtered = [...properties];

    if (city) {
        filtered = filtered.filter(p =>
            p.location.city.toLowerCase().includes(city.toLowerCase())
        );
    }

    if (type) {
        filtered = filtered.filter(p =>
            p.type.toLowerCase() === type.toLowerCase()
        );
    }

    if (minPrice) {
        filtered = filtered.filter(p => p.price >= parseInt(minPrice));
    }

    if (maxPrice) {
        filtered = filtered.filter(p => p.price <= parseInt(maxPrice));
    }

    res.json({
        success: true,
        properties: filtered,
        count: filtered.length
    });
});

/**
 * GET /api/properties/:id
 * Get a single property
 */
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const property = properties.find(p => p.id === id);

    if (!property) {
        return res.status(404).json({
            success: false,
            error: 'Property not found'
        });
    }

    res.json({
        success: true,
        property
    });
});

export default router;
