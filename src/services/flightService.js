// src/services/flightService.js
import { api } from './api';

export async function searchFlights({ origin, destination, date }) {
  const { flights } = await api.get(
    `/api/flights/search?origin=${origin}&destination=${destination}&date=${date}`
  );
  return flights;
}

export async function createBooking({ flightId, cardNumber, cardName }) {
  return api.post('/api/bookings', { flightId, cardNumber, cardName });
}