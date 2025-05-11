"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/Auth/authRoutes.ts
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const promise_1 = __importDefault(require("mysql2/promise"));
const config_1 = require("../../config");
const router = express_1.default.Router();
const conexion = promise_1.default.createPool({
    host: config_1.DB_HOST,
    user: config_1.DB_USER,
    password: config_1.DB_PASSWORD,
    database: config_1.DB_NAME,
    port: Number(config_1.DB_PORT),
    multipleStatements: false,
});
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, contrasena } = req.body;
    try {
        const [rows] = yield conexion.query('SELECT usuario.*, rol.nombre AS rol FROM usuario JOIN rol ON usuario.fk_id_rol = rol.id_rol WHERE correo = ?', [correo]);
        if (rows.length === 0)
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        const usuario = rows[0];
        const valid = yield bcryptjs_1.default.compare(contrasena, usuario.contrasena);
        if (!valid)
            return res.status(401).json({ msg: 'Contraseña incorrecta' });
        const token = jsonwebtoken_1.default.sign({ id: usuario.id_usuario, rol: usuario.rol }, process.env.JWT_SECRET || 'secreto_estetica', { expiresIn: '4h' });
        return res.json({ token, rol: usuario.rol });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error interno del servidor' });
    }
}));
exports.default = router;
