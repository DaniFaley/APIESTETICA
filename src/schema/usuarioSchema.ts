//Validaciones
//Importamos el paquete (zod): Sirve para validar los datos que ingresa el usuario sean seguros y correctos
import { z } from 'zod';

const letrasEspaciosRegex = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/;
const rfcRegex = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/i;
const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/i;
const telefonoRegex = /^\d{10,12}$/;
const codigoPostalRegex = /^\d{5}$/;

export const UsuarioSchema = z.object({
  primer_nombre: z.string().regex(letrasEspaciosRegex, {
    message: "Solo letras y espacios."
  }).min(2).max(50),

  segundo_nombre: z.string().regex(letrasEspaciosRegex, {
    message: "Solo letras y espacios."
  }).max(50).optional().or(z.literal("")),

  primer_apellido: z.string().regex(letrasEspaciosRegex, {
    message: "Solo letras y espacios."
  }).min(2).max(50),

  segundo_apellido: z.string().regex(letrasEspaciosRegex, {
    message: "Solo letras y espacios."
  }).max(50).optional().or(z.literal("")),

  calle: z.string().min(2).max(100),

  numero_casa: z.string().min(1).max(10),

  colonia: z.string().min(2).max(100),

  ciudad: z.string().min(2).max(100),

  estado: z.string().min(2).max(100),

  codigo_postal: z.string().regex(codigoPostalRegex, {
    message: "Debe ser un código postal válido de 5 dígitos."
  }),

  rfc: z.string().regex(rfcRegex, {
    message: "RFC no válido."
  }),

  curp: z.string().regex(curpRegex, {
    message: "CURP no válido."
  }),

  telefono: z.string().regex(telefonoRegex, {
    message: "Debe contener entre 10 y 12 dígitos numéricos."
  }),
});
