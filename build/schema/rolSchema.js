"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolSchema = void 0;
//Validaciones
//Importamos el paquete (zod): Sirve para validar los datos que ingresa el usuario sean seguros y correctos
const zod_1 = require("zod");
const descripcionRegEx = new RegExp(/^[a-zA-Z\s]+$/);
// Esquema de validaciones para clientes
exports.RolSchema = zod_1.z.object({
    nombre: zod_1.z.string().regex(descripcionRegEx, {
        message: "El nombre solo puede contener letras y espacios."
    }).min(2, "Mínimo 2 caracteres").max(100, "Máximo 100 caracteres")
});
