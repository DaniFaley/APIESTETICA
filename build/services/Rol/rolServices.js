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
exports.borrarRol = exports.modificarRol = exports.agregarRol = exports.encuentraRol = exports.obtieneRol = void 0;
//Aqui haremos las conexiones a la base de datos
const promise_1 = __importDefault(require("mysql2/promise"));
//Importamos las validaciones
const rolSchema_1 = require("../../schema/rolSchema");
const config_1 = require("../../config");
//Conexion a la base de datos
const conexion = promise_1.default.createPool({
    host: config_1.DB_HOST,
    user: config_1.DB_USER,
    password: config_1.DB_PASSWORD,
    database: config_1.DB_NAME,
    port: Number(config_1.DB_PORT),
    multipleStatements: false,
});
exports.default = conexion;
//Para mostrar todos los registros de la tabla Rol
const obtieneRol = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM rol');
        return results;
    }
    catch (err) {
        return { error: "No se puede obterner la Rol" };
    }
});
exports.obtieneRol = obtieneRol;
//Para mostrar uno en especifico de la tabla cuenta
const encuentraRol = (id_rol) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM rol WHERE id_rol = ? LIMIT 1', id_rol);
        return results;
    }
    catch (err) {
        return { error: "No se encuentra esa Rol" };
    }
});
exports.encuentraRol = encuentraRol;
//Para insertar a la tabla Rol: No se incluye el id de la tabla
const agregarRol = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = rolSchema_1.RolSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if (!validacion.success) {
            return { error: validacion.error };
        }
        //---------------------
        const [results] = yield conexion.query('INSERT INTO rol(nombre) values (?)', [nuevo.nombre]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar la Rol" };
    }
});
exports.agregarRol = agregarRol;
//Para modificar un registro de la tabla Rol: Se incluye el id de la tabla al final de los elementos
const modificarRol = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('UPDATE rol SET nombre=? WHERE id_rol=?', [modificado.nombre, modificado.id_rol]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar" };
    }
});
exports.modificarRol = modificarRol;
//Eliminar un registro de la tabla Rol
const borrarRol = (id_rol) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('DELETE FROM rol WHERE id_rol=?', [id_rol]);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar" };
    }
});
exports.borrarRol = borrarRol;
// Consultas para generar graficos de la vista: Analisis
