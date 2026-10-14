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