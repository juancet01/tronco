import { obtenerVuelos } from '../database/conexion';

function formatTime(value) {
  const match = String(value).match(/(?:T| )(\d{2}:\d{2})/);
  return match ? match[1] : '--:--';
}

export async function cargarVuelos() {
  const vuelos = await obtenerVuelos();

  return vuelos.map((vuelo) => {
    const durationMinutes = Number(vuelo.durationMinutes);

    return {
      id: String(vuelo.id),
      title: `${vuelo.originCity} → ${vuelo.destinationCity}`,
      airline: `Vuelo ${vuelo.flightNumber}${
        vuelo.aircraftModel ? ` · ${vuelo.aircraftModel}` : ''
      }`,
      countryRoute: `${vuelo.originCountry} → ${vuelo.destinationCountry}`,
      time: `${formatTime(vuelo.departureAt)} - ${formatTime(vuelo.arrivalAt)}`,
      price:
        vuelo.price === null || vuelo.price === undefined
          ? 'Precio no disponible'
          : `$${vuelo.price}`,
      duration: `${Math.floor(durationMinutes / 60)}h ${durationMinutes % 60}m`,
      badge: vuelo.originCountry === vuelo.destinationCountry ? 'Nacional' : 'Internacional',
      originCountry: vuelo.originCountry,
      destinationCountry: vuelo.destinationCountry,
    };
  });
}
