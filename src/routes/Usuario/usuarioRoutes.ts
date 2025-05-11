import express, {Request,Response} from 'express';
import * as usuarioServices from '../../services/Usuario/usuarioServices';
//Activamos las rutas
const router = express.Router();

//Rutas

//Para mostrar todos los registros
//http://localhost:3001/api/usuario/
router.get('/', async (_req: Request, res: Response)=>{
    let usuario = await usuarioServices.obtieneUsuario();
    res.send(usuario)
});

//Para mostrar un registro en especifico
//http://localhost:3001/api/usuario/1 <------Numero id del personal
router.get('/:id_datos_usuario', async (req: Request, res: Response)=>{
    let usuario = await usuarioServices.encuentraUsuario(Number(req.params.id_datos_usuario));
    res.send(usuario);
});

//Para insertar
//Rutas para hacer insercciones: Post es para insertar: No se le pone el campo id de la tabla
router.post('/', async (req: Request, res: Response)=>{
    try{
        const {primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,calle,numero_casa,colonia,ciudad,estado,codigo_postal,rfc,curp,telefono} = req.body;
        const nuevo = await usuarioServices.agregarUsuario({
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            calle,
            numero_casa,
            colonia,
            ciudad,
            estado,
            codigo_postal,
            rfc,
            curp,
            telefono
        });
        res.send(nuevo);
    }catch(e){
        res.send("No se puede agregar la nombre");
        // res.status(400).send('Error en los datos');
    }
});

//Para modificar datos: Se le pone el id de la misma tabla
router.put('/', async (req: Request, res: Response) => {
    try{
        const{id_datos_usuario,primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,calle,numero_casa,colonia,ciudad,estado,codigo_postal,rfc,curp,telefono} = req.body;
        const modificado = await usuarioServices.modificarUsuario({
            id_datos_usuario,
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            calle,
            numero_casa,
            colonia,
            ciudad,
            estado,
            codigo_postal,
            rfc,
            curp,
            telefono
        });
        res.send(modificado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

//Eliminar un registro.
router.delete('/', async (req: Request, res: Response) => {
    try{
        const {id_datos_usuario} = req.body;
        const eliminado = await usuarioServices.borrarUsuario(Number(id_datos_usuario));
        res.send(eliminado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

export default router;