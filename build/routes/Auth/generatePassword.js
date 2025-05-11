"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// generatePassword.ts
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const contrasena = 'daniel'; // La contraseña que deseas almacenar
const salt = bcryptjs_1.default.genSaltSync(10); // Genera un "salt" (sal)
const contrasenaCifrada = bcryptjs_1.default.hashSync(contrasena, salt); // Cifra la contraseña
console.log(contrasenaCifrada); // Esta es la contraseña cifrada que debes almacenar en la base de datos
