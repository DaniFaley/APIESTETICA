"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolUsuarioSchema = void 0;
const zod_1 = require("zod");
exports.RolUsuarioSchema = zod_1.z.object({
    correo: zod_1.z.string()
        .email("El correo electrónico no es válido")
        .min(5, "El correo debe tener al menos 5 caracteres")
        .max(100, "El correo no debe exceder los 100 caracteres")
});
