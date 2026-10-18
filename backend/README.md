# API de vuelos

1. Copia `backend/.env.example` a `backend/.env` y configura las credenciales
   de MySQL. No publiques ese archivo.
2. Desde `backend`, ejecuta `npm install` y luego `npm start`.
3. Copia `.env.example` a `.env` en la raíz para Expo. En un teléfono físico,
   reemplaza `localhost` por la IP local de la computadora que ejecuta el backend.

La API `GET /api/vuelos` lee los vuelos y aeropuertos de MySQL. El precio es el
menor costo registrado en `reserva` para cada vuelo. El esquema no guarda una
aerolínea ni moneda; la app muestra el número de vuelo y modelo del avión, y el
costo tal como está guardado.
