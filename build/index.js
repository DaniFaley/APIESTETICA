"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Rutas
const sexoRoutes_1 = __importDefault(require("./routes/Sexo/sexoRoutes"));
const servicioRoutes_1 = __importDefault(require("./routes/Servicio/servicioRoutes"));
const usuarioRoutes_1 = __importDefault(require("./routes/Usuario/usuarioRoutes"));
const corteRoutes_1 = __importDefault(require("./routes/Corte/corteRoutes"));
const authRoutes_1 = __importDefault(require("./routes/Auth/authRoutes"));
const rolRoutes_1 = __importDefault(require("./routes/Rol/rolRoutes"));
const rol_usuarioRoutes_1 = __importDefault(require("./routes/RolUsuario/rol_usuarioRoutes"));
// Importar configuración de variables de entorno
const config_1 = require("./config");
// Crear la aplicación con Express
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Usar rutas
app.use('/api/sexo', sexoRoutes_1.default);
app.use('/api/servicio', servicioRoutes_1.default);
app.use('/api/usuario', usuarioRoutes_1.default);
app.use('/api/corte', corteRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
app.use('/api/rol', rolRoutes_1.default);
app.use('/api/rol_usuario', rol_usuarioRoutes_1.default);
// Iniciar el servidor
app.listen(config_1.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${config_1.PORT}`);
});
