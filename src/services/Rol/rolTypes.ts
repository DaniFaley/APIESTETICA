export interface Rol{
    id_rol: number,
    nombre: string
}
//Para insertar: Tendra todo lo de Personal excepto el id.
export type RolAgregar = Omit<Rol,'id_rol'>