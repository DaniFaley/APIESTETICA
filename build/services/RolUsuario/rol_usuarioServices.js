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
exports.borrarRolUsuario = exports.modificarRolUsuario = exports.agregarRolUsuario = exports.encuentraRolUsuario = exports.obtieneRolUsuario = void 0;
//Aqui haremos las conexiones a la base de datos
const promise_1 = __importDefault(require("mysql2/promise"));
//Importamos las validaciones
const rol_usuarioSchema_1 = require("../../schema/rol_usuarioSchema");
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
//Para mostrar todos los registros de la tabla RolUsuario
const obtieneRolUsuario = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM usuario');
        return results;
    }
    catch (err) {
        return { error: "No se puede obterner la usuario" };
    }
});
exports.obtieneRolUsuario = obtieneRolUsuario;
//Para mostrar uno en especifico de la tabla cuenta
const encuentraRolUsuario = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM usuario WHERE id_usuario = ? LIMIT 1', id_usuario);
        return results;
    }
    catch (err) {
        return { error: "No se encuentra esa usuario" };
    }
});
exports.encuentraRolUsuario = encuentraRolUsuario;
//Para insertar a la tabla RolUsuario: No se incluye el id de la tabla
const agregarRolUsuario = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = rol_usuarioSchema_1.RolUsuarioSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if (!validacion.success) {
            return { error: validacion.error };
        }
        //---------------------
        const [results] = yield conexion.query('INSERT INTO usuario(correo,contrasena,fk_id_rol) values (?,?,?)', [nuevo.correo, nuevo.contrasena, nuevo.fk_id_rol]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar la usuario" };
    }
});
exports.agregarRolUsuario = agregarRolUsuario;
//Para modificar un registro de la tabla Usuario: Se incluye el id de la tabla al final de los elementos
const modificarRolUsuario = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('UPDATE usuario SET correo=?,contrasena=?,fk_id_rol=? WHERE id_usuario=?', [modificado.correo, modificado.contrasena, modificado.fk_id_rol, modificado.id_usuario]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar" };
    }
});
exports.modificarRolUsuario = modificarRolUsuario;
//Eliminar un registro de la tabla RolUsuario
const borrarRolUsuario = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('DELETE FROM usuario WHERE id_usuario=?', [id_usuario]);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar" };
    }
});
exports.borrarRolUsuario = borrarRolUsuario;
// Consultas para generar graficos de la vista: Analisis
