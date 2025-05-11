//Validaciones
//Importamos el paquete (zod): Sirve para validar los datos que ingresa el usuario sean seguros y correctos
import { z } from 'zod';

const descripcionRegEx = new RegExp(/^[a-zA-Z\s]+$/);
// Esquema de validaciones para clientes
export const CorteSchema = z.object({
    nombre_cliente: z.string().regex(descripcionRegEx, {
        message: "El nombre solo puede contener letras y espacios."
    }).min(2, "Mínimo 2 caracteres").max(100, "Máximo 100 caracteres")
});