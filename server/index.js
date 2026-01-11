import 'dotenv/config';
import express from 'express';
import cors from 'cors';

// Import routes
import chatRoutes from './routes/chat.js';
import bookingsRoutes from './routes/bookings.js';
import propertiesRoutes from './routes/properties.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} | ${req.method} ${req.path}`);
    next();
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'Pronto RAG API',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api/chat', chatRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/properties', propertiesRoutes);

// Analytics endpoint (placeholder for future)
app.get('/api/analytics', (req, res) => {
    res.json({
        success: true,
        metrics: {
            totalLeads: 47,
            avgResponseTime: '28s',
            conversionRate: '34%',
            visitsBooked: 16,
            aiResponseRate: '89%',
            leadsBySource: {
                'Idealista': 22,
                'Imovirtual': 15,
                'Casa Sapo': 7,
                'Website': 3
            },
            leadScores: {
                hot: 8,
                warm: 24,
                cold: 15
            }
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════╗
║                                                        ║
║   ⚡ PRONTO RAG API Server                             ║
║                                                        ║
║   Server running on: http://localhost:${PORT}            ║
║                                                        ║
║   Endpoints:                                           ║
║   • POST /api/chat          - AI chat with RAG         ║
║   • GET  /api/properties    - List properties          ║
║   • GET  /api/bookings      - List bookings            ║
║   • POST /api/bookings      - Create booking           ║
║   • GET  /api/analytics     - Dashboard metrics        ║
║                                                        ║
║   Gemini API: ${process.env.GEMINI_API_KEY ? '✓ Configured' : '✗ Not configured (using mock)'}
║                                                        ║
╚════════════════════════════════════════════════════════╝
  `);
});
