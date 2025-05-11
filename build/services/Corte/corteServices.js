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
exports.borrarCorte = exports.modificarCorte = exports.agregarCorte = exports.encuentraCorte = exports.obtieneCorte = void 0;
//Aqui haremos las conexiones a la base de datos
const promise_1 = __importDefault(require("mysql2/promise"));
//Importamos las validaciones
const corteSchema_1 = require("../../schema/corteSchema");
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
//Para mostrar todos los registros de la tabla Corte
const obtieneCorte = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM corte');
        return results;
    }
    catch (err) {
        return { error: "No se puede obterner la Corte" };
    }
});
exports.obtieneCorte = obtieneCorte;
//Para mostrar uno en especifico de la tabla cuenta
const encuentraCorte = (id_corte) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM corte WHERE id_corte = ? LIMIT 1', id_corte);
        return results;
    }
    catch (err) {
        return { error: "No se encuentra esa Corte" };
    }
});
exports.encuentraCorte = encuentraCorte;
//Para insertar a la tabla Corte: No se incluye el id de la tabla
const agregarCorte = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = corteSchema_1.CorteSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if (!validacion.success) {
            return { error: validacion.error };
        }
        //---------------------
        const [results] = yield conexion.query('INSERT INTO corte(nombre_cliente,fk_id_sexo,fk_id_servicio,monto,fecha,comentario) values (?,?,?,?,?,?)', [nuevo.nombre_cliente, nuevo.fk_id_sexo, nuevo.fk_id_servicio, nuevo.monto, nuevo.fecha, nuevo.comentario]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar la Corte" };
    }
});
exports.agregarCorte = agregarCorte;
//Para modificar un registro de la tabla Corte: Se incluye el id de la tabla al final de los elementos
const modificarCorte = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('UPDATE corte SET nombre_cliente=?,fk_id_sexo=?,fk_id_servicio=?,monto=?,fecha=?,comentario=? WHERE id_corte=?', [modificado.nombre_cliente, modificado.fk_id_sexo, modificado.fk_id_servicio, modificado.monto, modificado.fecha, modificado.comentario, modificado.id_corte]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar" };
    }
});
exports.modificarCorte = modificarCorte;
//Eliminar un registro de la tabla Corte
const borrarCorte = (id_corte) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('DELETE FROM corte WHERE id_corte=?', [id_corte]);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar" };
    }
});
exports.borrarCorte = borrarCorte;
// Consultas para generar graficos de la vista: Analisis
