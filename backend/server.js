// backend/server.js
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint de prueba
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Backend Tronco funcionando' });
});

// Endpoint de búsqueda de vuelos (MOCK por ahora)
app.get('/api/flights/search', (req, res) => {
  const { origin, destination, date } = req.query;

  const flights = [
    {
      id: 'TRV-001',
      airline: 'Aerolíneas Argentinas',
      origin: origin || 'COR',
      destination: destination || 'SLA',
      departure_at: `${date || '2026-10-15'}T08:30:00`,
      arrival_at: `${date || '2026-10-15'}T10:15:00`,
      duration: '1h 45m',
      price: 120.50,
      currency: 'USD',
      badge: 'Nacional',
    },
    {
      id: 'TRV-002',
      airline: 'FlyBondi',
      origin: origin || 'COR',
      destination: destination || 'SLA',
      departure_at: `${date || '2026-10-15'}T14:00:00`,
      arrival_at: `${date || '2026-10-15'}T15:50:00`,
      duration: '1h 50m',
      price: 95.00,
      currency: 'USD',
      badge: 'Nacional',
    },
    {
      id: 'TRV-003',
      airline: 'JetSmart',
      origin: origin || 'COR',
      destination: destination || 'SLA',
      departure_at: `${date || '2026-10-15'}T19:20:00`,
      arrival_at: `${date || '2026-10-15'}T21:10:00`,
      duration: '1h 50m',
      price: 88.75,
      currency: 'USD',
      badge: 'Nacional',
    },
  ];

  res.json({ flights });
});

// Endpoint de pago simulado (MOCK)
app.post('/api/bookings', (req, res) => {
  const { flightId, cardNumber } = req.body;

  if (cardNumber !== '4242424242424242') {
    return res.status(400).json({ success: false, message: 'Tarjeta rechazada' });
  }

  res.json({
    success: true,
    confirmationCode: `TRV-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    flightId,
  });
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
  console.log(`📱 Accesible desde el celular en http://TU_IP_LOCAL:${PORT}`);
});