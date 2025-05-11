export interface Sexo{
    id_sexo: number,
    nombre: string
}
//Para insertar: Tendra todo lo de Personal excepto el id.
export type SexoAgregar = Omit<Sexo,'id_sexo'>