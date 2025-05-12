//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {RolUsuario, RolUsuarioAgregar} from './rol_usuarioTypes';
//Importamos las validaciones
import { RolUsuarioSchema } from '../../schema/rol_usuarioSchema';
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
//Para mostrar todos los registros de la tabla RolUsuario
export const obtieneRolUsuario = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM usuario');
        return results;
    }catch(err){
        return{error: "No se puede obterner la usuario"};
    }
}
//Para mostrar uno en especifico de la tabla cuenta
export const encuentraRolUsuario = async (id_usuario:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM usuario WHERE id_usuario = ? LIMIT 1', id_usuario);
        return results;
    }catch(err){
        return {error: "No se encuentra esa usuario"};
    }
}
//Para insertar a la tabla RolUsuario: No se incluye el id de la tabla
export const agregarRolUsuario = async(nuevo:RolUsuarioAgregar) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = RolUsuarioSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO usuario(correo,contrasena,fk_id_rol) values (?,?,?)',[nuevo.correo,nuevo.contrasena,nuevo.fk_id_rol]);
        return results;
    }catch(err){
        return{error: "No se puede agregar la usuario"}
    }
}
//Para modificar un registro de la tabla Usuario: Se incluye el id de la tabla al final de los elementos
export const modificarRolUsuario = async (modificado:RolUsuario) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE usuario SET correo=?,contrasena=?,fk_id_rol=? WHERE id_usuario=?',[modificado.correo,modificado.contrasena,modificado.fk_id_rol,modificado.id_usuario]);
        return results;
    }catch(err){
        return{error: "No se puede modificar"}
    }
}
//Eliminar un registro de la tabla RolUsuario
export const borrarRolUsuario = async(id_usuario:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM usuario WHERE id_usuario=?',[id_usuario]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar"}
    }
}

// Consultas para generar graficos de la vista: Analisis