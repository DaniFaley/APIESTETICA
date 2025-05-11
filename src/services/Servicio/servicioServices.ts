//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {Servicio, ServicioAgregar} from './servicioTypes';
//Importamos las validaciones
import { ServicioSchema } from '../../schema/servicioSchema';
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
//Para mostrar todos los registros de la tabla Servicio
export const obtieneServicio = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM servicio');
        return results;
    }catch(err){
        return{error: "No se puede obterner la Servicio"};
    }
}
//Para mostrar uno en especifico de la tabla cuenta
export const encuentraServicio = async (id_servicio:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM servicio WHERE id_servicio = ? LIMIT 1', id_servicio);
        return results;
    }catch(err){
        return {error: "No se encuentra esa Servicio"};
    }
}
//Para insertar a la tabla Servicio: No se incluye el id de la tabla
export const agregarServicio = async(nuevo:ServicioAgregar) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = ServicioSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO servicio(nombre) values (?)',[nuevo.nombre]);
        return results;
    }catch(err){
        return{error: "No se puede agregar la Servicio"}
    }
}
//Para modificar un registro de la tabla Servicio: Se incluye el id de la tabla al final de los elementos
export const modificarServicio = async (modificado:Servicio) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE servicio SET nombre=? WHERE id_servicio=?',[modificado.nombre,modificado.id_servicio]);
        return results;
    }catch(err){
        return{error: "No se puede modificar"}
    }
}
//Eliminar un registro de la tabla Servicio
export const borrarServicio = async(id_servicio:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM servicio WHERE id_servicio=?',[id_servicio]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar"}
    }
}
