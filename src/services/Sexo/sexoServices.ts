//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {Sexo, SexoAgregar} from '../../services/Sexo/sexoTypes';
//Importamos las validaciones
import { SexoSchema } from '../../schema/sexoSchema';
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
//Para mostrar todos los registros de la tabla Sexo
export const obtieneSexo = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM sexo');
        return results;
    }catch(err){
        return{error: "No se puede obterner la Sexo"};
    }
}
//Para mostrar uno en especifico de la tabla cuenta
export const encuentraSexo = async (id_sexo:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM sexo WHERE id_sexo = ? LIMIT 1', id_sexo);
        return results;
    }catch(err){
        return {error: "No se encuentra esa sexo"};
    }
}
//Para insertar a la tabla Sexo: No se incluye el id de la tabla
export const agregarSexo = async(nuevo:SexoAgregar) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = SexoSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO sexo(nombre) values (?)',[nuevo.nombre]);
        return results;
    }catch(err){
        return{error: "No se puede agregar la sexo"}
    }
}
//Para modificar un registro de la tabla Sexo: Se incluye el id de la tabla al final de los elementos
export const modificarSexo = async (modificado:Sexo) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE sexo SET nombre=? WHERE id_sexo=?',[modificado.nombre,modificado.id_sexo]);
        return results;
    }catch(err){
        return{error: "No se puede modificar"}
    }
}
//Eliminar un registro de la tabla sexo
export const borrarSexo = async(id_sexo:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM sexo WHERE id_sexo=?',[id_sexo]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar"}
    }
}
