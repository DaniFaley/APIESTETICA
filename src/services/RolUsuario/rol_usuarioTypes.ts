export interface RolUsuario{
    id_usuario: number,
    correo: string,
    contrasena: string,
    fk_id_rol: number
}
//Para insertar: Tendra todo lo de Personal excepto el id.
export type RolUsuarioAgregar = Omit<RolUsuario,'id_usuario'>