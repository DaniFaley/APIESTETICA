//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {Corte, CorteAgregar} from './corteTypes';
//Importamos las validaciones
import { CorteSchema } from '../../schema/corteSchema';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from '../../config';

//Conexion a la base de datos
const conexion = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: Number(DB_PORT),
    multipleStatements: false,
});

export default conexion;
//Para mostrar todos los registros de la tabla Corte
export const obtieneCorte = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM corte');
        return results;
    }catch(err){
        return{error: "No se puede obterner la Corte"};
    }
}
//Para mostrar uno en especifico de la tabla cuenta
export const encuentraCorte = async (id_corte:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM corte WHERE id_corte = ? LIMIT 1', id_corte);
        return results;
    }catch(err){
        return {error: "No se encuentra esa Corte"};
    }
}
//Para insertar a la tabla Corte: No se incluye el id de la tabla
export const agregarCorte = async(nuevo:CorteAgregar) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = CorteSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO corte(nombre_cliente,fk_id_sexo,fk_id_servicio,monto,fecha,comentario) values (?,?,?,?,?,?)',[nuevo.nombre_cliente,nuevo.fk_id_sexo,nuevo.fk_id_servicio,nuevo.monto,nuevo.fecha,nuevo.comentario]);
        return results;
    }catch(err){
        return{error: "No se puede agregar la Corte"}
    }
}
//Para modificar un registro de la tabla Corte: Se incluye el id de la tabla al final de los elementos
export const modificarCorte = async (modificado:Corte) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE corte SET nombre_cliente=?,fk_id_sexo=?,fk_id_servicio=?,monto=?,fecha=?,comentario=? WHERE id_corte=?',[modificado.nombre_cliente,modificado.fk_id_sexo,modificado.fk_id_servicio,modificado.monto,modificado.fecha,modificado.comentario,modificado.id_corte]);
        return results;
    }catch(err){
        return{error: "No se puede modificar"}
    }
}
//Eliminar un registro de la tabla Corte
export const borrarCorte = async(id_corte:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM corte WHERE id_corte=?',[id_corte]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar"}
    }
}

// Consultas para generar graficos de la vista: Analisis