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
exports.borrarUsuario = exports.modificarUsuario = exports.agregarUsuario = exports.encuentraUsuario = exports.obtieneUsuario = void 0;
//Aqui haremos las conexiones a la base de datos
const promise_1 = __importDefault(require("mysql2/promise"));
//Importamos las validaciones
const usuarioSchema_1 = require("../../schema/usuarioSchema");
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
//Para mostrar todos los registros de la tabla Usuario
const obtieneUsuario = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM datos_usuario');
        return results;
    }
    catch (err) {
        return { error: "No se puede obterner la Usuario" };
    }
});
exports.obtieneUsuario = obtieneUsuario;
//Para mostrar uno en especifico de la tabla cuenta
const encuentraUsuario = (id_datos_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM datos_usuario WHERE id_datos_usuario = ? LIMIT 1', id_datos_usuario);
        return results;
    }
    catch (err) {
        return { error: "No se encuentra esa Usuario" };
    }
});
exports.encuentraUsuario = encuentraUsuario;
//Para insertar a la tabla Usuario: No se incluye el id de la tabla
const agregarUsuario = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = usuarioSchema_1.UsuarioSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if (!validacion.success) {
            return { error: validacion.error };
        }
        //---------------------
        const [results] = yield conexion.query('INSERT INTO datos_usuario(primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,calle,numero_casa,colonia,ciudad,estado,codigo_postal,rfc,curp,telefono) values (?,?,?,?,?,?,?,?,?,?,?,?,?)', [nuevo.primer_nombre, nuevo.segundo_nombre, nuevo.primer_apellido, nuevo.segundo_apellido, nuevo.calle, nuevo.numero_casa, nuevo.colonia, nuevo.ciudad, nuevo.estado, nuevo.codigo_postal, nuevo.rfc, nuevo.curp, nuevo.telefono]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar la Usuario" };
    }
});
exports.agregarUsuario = agregarUsuario;
//Para modificar un registro de la tabla Usuario: Se incluye el id de la tabla al final de los elementos
const modificarUsuario = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('UPDATE datos_usuario SET primer_nombre=?, segundo_nombre=?, primer_apellido=?, segundo_apellido=?, calle=?, numero_casa=?, colonia=?, ciudad=?, estado=?, codigo_postal=?, rfc=?, curp=?, telefono=? WHERE id_datos_usuario=?', [modificado.primer_nombre, modificado.segundo_nombre, modificado.primer_apellido, modificado.segundo_apellido, modificado.calle, modificado.numero_casa, modificado.colonia, modificado.ciudad, modificado.estado, modificado.codigo_postal, modificado.rfc, modificado.curp, modificado.telefono, modificado.id_datos_usuario]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar" };
    }
});
exports.modificarUsuario = modificarUsuario;
//Eliminar un registro de la tabla Usuario
const borrarUsuario = (id_datos_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('DELETE FROM datos_usuario WHERE id_datos_usuario=?', [id_datos_usuario]);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar" };
    }
});
exports.borrarUsuario = borrarUsuario;
