//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {Rol, RolAgregar} from './rolTypes';
//Importamos las validaciones
import { RolSchema } from '../../schema/rolSchema';
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
//Para mostrar todos los registros de la tabla Rol
export const obtieneRol = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM rol');
        return results;
    }catch(err){
        return{error: "No se puede obterner la Rol"};
    }
}
//Para mostrar uno en especifico de la tabla cuenta
export const encuentraRol = async (id_rol:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM rol WHERE id_rol = ? LIMIT 1', id_rol);
        return results;
    }catch(err){
        return {error: "No se encuentra esa Rol"};
    }
}
//Para insertar a la tabla Rol: No se incluye el id de la tabla
export const agregarRol = async(nuevo:RolAgregar) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = RolSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO rol(nombre) values (?)',[nuevo.nombre]);
        return results;
    }catch(err){
        return{error: "No se puede agregar la Rol"}
    }
}
//Para modificar un registro de la tabla Rol: Se incluye el id de la tabla al final de los elementos
export const modificarRol = async (modificado:Rol) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE rol SET nombre=? WHERE id_rol=?',[modificado.nombre,modificado.id_rol]);
        return results;
    }catch(err){
        return{error: "No se puede modificar"}
    }
}
//Eliminar un registro de la tabla Rol
export const borrarRol = async(id_rol:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM rol WHERE id_rol=?',[id_rol]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar"}
    }
}

// Consultas para generar graficos de la vista: Analisis