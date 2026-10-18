import 'dotenv/config';
import mysql from 'mysql2/promise';

const requiredVariables = ['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
const missingVariables = requiredVariables.filter((name) => !process.env[name]);

if (missingVariables.length > 0) {
  throw new Error(`Faltan variables de entorno: ${missingVariables.join(', ')}`);
}

const port = Number(process.env.DB_PORT || 3306);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('DB_PORT debe ser un número entre 1 y 65535.');
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  dateStrings: true,
});

export default pool;
