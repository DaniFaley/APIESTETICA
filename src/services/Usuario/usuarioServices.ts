//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {Usuario, UsuarioAgregar} from './usuarioTypes';
//Importamos las validaciones
import { UsuarioSchema } from '../../schema/usuarioSchema';
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
//Para mostrar todos los registros de la tabla Usuario
export const obtieneUsuario = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM datos_usuario');
        return results;
    }catch(err){
        return{error: "No se puede obterner la Usuario"};
    }
}
//Para mostrar uno en especifico de la tabla cuenta
export const encuentraUsuario = async (id_datos_usuario:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM datos_usuario WHERE id_datos_usuario = ? LIMIT 1', id_datos_usuario);
        return results;
    }catch(err){
        return {error: "No se encuentra esa Usuario"};
    }
}
//Para insertar a la tabla Usuario: No se incluye el id de la tabla
export const agregarUsuario = async(nuevo:UsuarioAgregar) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = UsuarioSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO datos_usuario(primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,calle,numero_casa,colonia,ciudad,estado,codigo_postal,rfc,curp,telefono) values (?,?,?,?,?,?,?,?,?,?,?,?,?)',[nuevo.primer_nombre,nuevo.segundo_nombre,nuevo.primer_apellido,nuevo.segundo_apellido,nuevo.calle,nuevo.numero_casa,nuevo.colonia,nuevo.ciudad,nuevo.estado,nuevo.codigo_postal,nuevo.rfc,nuevo.curp,nuevo.telefono]);
        return results;
    }catch(err){
        return{error: "No se puede agregar la Usuario"}
    }
}
//Para modificar un registro de la tabla Usuario: Se incluye el id de la tabla al final de los elementos
export const modificarUsuario = async (modificado:Usuario) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE datos_usuario SET primer_nombre=?, segundo_nombre=?, primer_apellido=?, segundo_apellido=?, calle=?, numero_casa=?, colonia=?, ciudad=?, estado=?, codigo_postal=?, rfc=?, curp=?, telefono=? WHERE id_datos_usuario=?',[modificado.primer_nombre, modificado.segundo_nombre, modificado.primer_apellido, modificado.segundo_apellido, modificado.calle, modificado.numero_casa, modificado.colonia, modificado.ciudad, modificado.estado, modificado.codigo_postal, modificado.rfc, modificado.curp, modificado.telefono, modificado.id_datos_usuario]);
        return results;
    }catch(err){
        return{error: "No se puede modificar"}
    }
}
//Eliminar un registro de la tabla Usuario
export const borrarUsuario = async(id_datos_usuario:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM datos_usuario WHERE id_datos_usuario=?',[id_datos_usuario]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar"}
    }
}
