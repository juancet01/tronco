const BASE_URL = process.env.EXPO_PUBLIC_API_URL?.replace(/\/+$/, '');

async function request(path, options = {}) {
  if (!BASE_URL) {
    throw new Error('Configura EXPO_PUBLIC_API_URL en el archivo .env de la app.');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 seg

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      signal: controller.signal,
      ...options,
    });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return res.json();
  } catch (e) {
    clearTimeout(timeoutId);
    if (e.name === 'AbortError') throw new Error('Timeout: no se pudo conectar al backend');
    throw e;
  }
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
};