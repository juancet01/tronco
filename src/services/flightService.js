import { api } from './api';

export async function getAllFlights() {
  const { flights } = await api.get('/api/flights');
  return flights;
}

export async function createBooking({ flightId, cardNumber, cardName }) {
  return api.post('/api/bookings', { flightId, cardNumber, cardName });
}