export interface Usuario{
    id_datos_usuario: number,
    primer_nombre: string,
    segundo_nombre: string,
    primer_apellido: string,
    segundo_apellido: string,
    calle: string,
    numero_casa: string,
    colonia: string,
    ciudad: string,
    estado: string,
    codigo_postal: string,
    rfc: string,
    curp: string,
    telefono: string
}
//Para insertar: Tendra todo lo de Personal excepto el id.
export type UsuarioAgregar = Omit<Usuario,'id_datos_usuario'>