import { z } from 'zod';

export const RolUsuarioSchema = z.object({
  correo: z.string()
    .email("El correo electrónico no es válido")
    .min(5, "El correo debe tener al menos 5 caracteres")
    .max(100, "El correo no debe exceder los 100 caracteres")
});