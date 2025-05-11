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
exports.borrarSexo = exports.modificarSexo = exports.agregarSexo = exports.encuentraSexo = exports.obtieneSexo = void 0;
//Aqui haremos las conexiones a la base de datos
const promise_1 = __importDefault(require("mysql2/promise"));
//Importamos las validaciones
const sexoSchema_1 = require("../../schema/sexoSchema");
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
//Para mostrar todos los registros de la tabla Sexo
const obtieneSexo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM sexo');
        return results;
    }
    catch (err) {
        return { error: "No se puede obterner la Sexo" };
    }
});
exports.obtieneSexo = obtieneSexo;
//Para mostrar uno en especifico de la tabla cuenta
const encuentraSexo = (id_sexo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM sexo WHERE id_sexo = ? LIMIT 1', id_sexo);
        return results;
    }
    catch (err) {
        return { error: "No se encuentra esa sexo" };
    }
});
exports.encuentraSexo = encuentraSexo;
//Para insertar a la tabla Sexo: No se incluye el id de la tabla
const agregarSexo = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = sexoSchema_1.SexoSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if (!validacion.success) {
            return { error: validacion.error };
        }
        //---------------------
        const [results] = yield conexion.query('INSERT INTO sexo(nombre) values (?)', [nuevo.nombre]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar la sexo" };
    }
});
exports.agregarSexo = agregarSexo;
//Para modificar un registro de la tabla Sexo: Se incluye el id de la tabla al final de los elementos
const modificarSexo = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('UPDATE sexo SET nombre=? WHERE id_sexo=?', [modificado.nombre, modificado.id_sexo]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar" };
    }
});
exports.modificarSexo = modificarSexo;
//Eliminar un registro de la tabla sexo
const borrarSexo = (id_sexo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('DELETE FROM sexo WHERE id_sexo=?', [id_sexo]);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar" };
    }
});
exports.borrarSexo = borrarSexo;
