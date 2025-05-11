"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Creamos la aplicación a través de Express
const app = (0, express_1.default)();
// Configurar middleware para que Express entienda JSON
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Puerto para escuchar la petición del frontend
const PUERTO = 3001;
// Iniciar el servidor
app.listen(PUERTO, () => {
    console.log(`Servidor en ejecución y escuchando el puerto ${PUERTO}`);
});
