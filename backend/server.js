// backend/server.js
import express from 'express';
import cors from 'cors';
import pool from './db/connection.js';

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint de prueba
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Backend Tronco funcionando' });
});

app.get('/api/vuelos', async (req, res, next) => {
  try {
    const [vuelos] = await pool.execute(`
      SELECT
        v.idvuelo AS id,
        v.numerovuelo AS flightNumber,
        origen.ciudad AS originCity,
        origen.pais AS originCountry,
        destino.ciudad AS destinationCity,
        destino.pais AS destinationCountry,
        v.fecha_salida AS departureAt,
        v.fecha_llegada AS arrivalAt,
        TIMESTAMPDIFF(MINUTE, v.fecha_salida, v.fecha_llegada) AS durationMinutes,
        a.modelo AS aircraftModel,
        (
          SELECT MIN(r.costo)
          FROM reserva r
          WHERE r.vuelo_idvuelo = v.idvuelo
        ) AS price
      FROM vuelo v
      INNER JOIN aeropuerto origen
        ON origen.codigoiata = v.aeropuerto_codigoiata_origen
      INNER JOIN aeropuerto destino
        ON destino.codigoiata = v.aeropuerto_codigoiata_destino
      LEFT JOIN avion a
        ON a.matricula = v.avion_matricula
      ORDER BY v.fecha_salida
    `);

    res.json(vuelos);
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  console.error('Error en la API:', error);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Endpoint de pago simulado (MOCK)
app.post('/api/bookings', (req, res) => {
  const { flightId, passengerCount = 1, cardNumber } = req.body;

  if (cardNumber !== '4242424242424242') {
    return res.status(400).json({ success: false, message: 'Tarjeta rechazada' });
  }

  if (!Number.isInteger(passengerCount) || passengerCount < 1) {
    return res.status(400).json({ success: false, message: 'Cantidad de pasajeros inválida' });
  }

  res.json({
    success: true,
    confirmationCode: `TRV-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    flightId,
    passengerCount,
  });
});

const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
  console.log(`📱 Accesible desde el celular en http://TU_IP_LOCAL:${PORT}`);
});