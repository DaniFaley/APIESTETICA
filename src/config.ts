import dotenv from 'dotenv';
dotenv.config();

// CONFIGURAR DATOS DE LA BASE DE DATOS
export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
export const DB_NAME = process.env.DB_NAME || 'proyecto_estetica';
export const DB_PORT = Number(process.env.DB_PORT) || 3306;

// console.log('Base de datos:', DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT);