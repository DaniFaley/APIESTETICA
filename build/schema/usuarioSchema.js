"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioSchema = void 0;
//Validaciones
//Importamos el paquete (zod): Sirve para validar los datos que ingresa el usuario sean seguros y correctos
const zod_1 = require("zod");
const letrasEspaciosRegex = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/;
const rfcRegex = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/i;
const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/i;
const telefonoRegex = /^\d{10,12}$/;
const codigoPostalRegex = /^\d{5}$/;
exports.UsuarioSchema = zod_1.z.object({
    primer_nombre: zod_1.z.string().regex(letrasEspaciosRegex, {
        message: "Solo letras y espacios."
    }).min(2).max(50),
    segundo_nombre: zod_1.z.string().regex(letrasEspaciosRegex, {
        message: "Solo letras y espacios."
    }).max(50).optional().or(zod_1.z.literal("")),
    primer_apellido: zod_1.z.string().regex(letrasEspaciosRegex, {
        message: "Solo letras y espacios."
    }).min(2).max(50),
    segundo_apellido: zod_1.z.string().regex(letrasEspaciosRegex, {
        message: "Solo letras y espacios."
    }).max(50).optional().or(zod_1.z.literal("")),
    calle: zod_1.z.string().min(2).max(100),
    numero_casa: zod_1.z.string().min(1).max(10),
    colonia: zod_1.z.string().min(2).max(100),
    ciudad: zod_1.z.string().min(2).max(100),
    estado: zod_1.z.string().min(2).max(100),
    codigo_postal: zod_1.z.string().regex(codigoPostalRegex, {
        message: "Debe ser un código postal válido de 5 dígitos."
    }),
    rfc: zod_1.z.string().regex(rfcRegex, {
        message: "RFC no válido."
    }),
    curp: zod_1.z.string().regex(curpRegex, {
        message: "CURP no válido."
    }),
    telefono: zod_1.z.string().regex(telefonoRegex, {
        message: "Debe contener entre 10 y 12 dígitos numéricos."
    }),
});
