const API_URL = process.env.EXPO_PUBLIC_API_URL?.replace(/\/+$/, '');

export async function obtenerVuelos() {
  if (!API_URL) {
    throw new Error(
      'Configura EXPO_PUBLIC_API_URL en el archivo .env de la app.'
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  let response;

  try {
    response = await fetch(`${API_URL}/api/vuelos`, {
      signal: controller.signal,
    });
  } catch (error) {
    if (controller.signal.aborted) {
      throw new Error(
        `La API no respondió en 10 segundos. Comprueba que el teléfono esté en la misma Wi-Fi y que el backend siga iniciado en ${API_URL}.`
      );
    }

    throw new Error(
      `No se pudo conectar con la API en ${API_URL}. Comprueba la Wi-Fi y el firewall de Windows. ${
        error.message || ''
      }`.trim()
    );
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    throw new Error(`No se pudieron cargar los vuelos (HTTP ${response.status}).`);
  }

  const vuelos = await response.json();

  if (!Array.isArray(vuelos)) {
    throw new Error('La API devolvió una lista de vuelos inválida.');
  }

  return vuelos;
}
