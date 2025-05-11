export interface Servicio{
    id_servicio: number,
    nombre: string
}
//Para insertar: Tendra todo lo de Personal excepto el id.
export type ServicioAgregar = Omit<Servicio,'id_servicio'>