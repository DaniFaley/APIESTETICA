// generatePassword.ts
import bcrypt from 'bcryptjs';

const contrasena = 'daniel';  // La contraseña que deseas almacenar
const salt = bcrypt.genSaltSync(10);  // Genera un "salt" (sal)
const contrasenaCifrada = bcrypt.hashSync(contrasena, salt);  // Cifra la contraseña

console.log(contrasenaCifrada);  // Esta es la contraseña cifrada que debes almacenar en la base de datos