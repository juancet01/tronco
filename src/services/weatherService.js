// src/services/weatherService.js

// Coordenadas por nombre de ciudad (normalizado: sin tildes, minúsculas)
const COORDS = {
  'cordoba':       { lat: -31.4201, lon: -64.1888, name: 'Córdoba' },
  'salta':         { lat: -24.7821, lon: -65.4232, name: 'Salta' },
  'mendoza':       { lat: -32.8895, lon: -68.8458, name: 'Mendoza' },
  'tucuman':       { lat: -26.8083, lon: -65.2176, name: 'Tucumán' },
  'bariloche':     { lat: -41.1335, lon: -71.3103, name: 'Bariloche' },
  'neuquen':       { lat: -38.9516, lon: -68.0591, name: 'Neuquén' },
  'rosario':       { lat: -32.9442, lon: -60.6505, name: 'Rosario' },
  'buenos aires':  { lat: -34.6037, lon: -58.3816, name: 'Buenos Aires' },
  'montevideo':    { lat: -34.9011, lon: -56.1645, name: 'Montevideo' },
  'lima':          { lat: -12.0464, lon: -77.0428, name: 'Lima' },
};

// Normaliza: quita tildes, pasa a minúsculas
function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

// Códigos WMO → emoji + descripción
function describeWeather(code) {
  if (code === 0) return { emoji: '☀️', text: 'Despejado' };
  if (code <= 3) return { emoji: '⛅', text: 'Parcialmente nublado' };
  if (code <= 48) return { emoji: '🌫️', text: 'Niebla' };
  if (code <= 67) return { emoji: '🌧️', text: 'Lluvia' };
  if (code <= 77) return { emoji: '❄️', text: 'Nieve' };
  if (code <= 82) return { emoji: '🌦️', text: 'Chaparrones' };
  if (code <= 86) return { emoji: '🌨️', text: 'Nieve fuerte' };
  return { emoji: '⛈️', text: 'Tormenta' };
}

export async function getWeatherByIATA(cityName) {
  if (!cityName) return null;
  const key = normalize(cityName);
  const coord = COORDS[key];
  if (!coord) {
    console.warn('Ciudad sin coordenadas:', cityName, '→ normalizado:', key);
    return null;
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coord.lat}&longitude=${coord.lon}&current=temperature_2m,weather_code`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Weather API ${res.status}`);
    const data = await res.json();

    return {
      city: coord.name,
      temperature: data.current.temperature_2m,
      weather: describeWeather(data.current.weather_code),
    };
  } catch (e) {
    console.warn('Clima no disponible para', cityName, '→', e.message);
    return null;
  }
}