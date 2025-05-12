import express, {Request,Response} from 'express';
import * as rol_usuarioServices from '../../services/RolUsuario/rol_usuarioServices';
//Activamos las rutas
const router = express.Router();

//Rutas

//Para mostrar todos los registros
//http://localhost:3001/api/rol_usuario/
router.get('/', async (_req: Request, res: Response)=>{
    let rol_usuario = await rol_usuarioServices.obtieneRolUsuario();
    res.send(rol_usuario)
});

//Para mostrar un registro en especifico
//http://localhost:3001/api/rol_usuario/1 <------Numero id del personal
router.get('/:id_usuario', async (req: Request, res: Response)=>{
    let rol_usuario = await rol_usuarioServices.encuentraRolUsuario(Number(req.params.id_usuario));
    res.send(rol_usuario);
});

//Para insertar
//Rutas para hacer insercciones: Post es para insertar: No se le pone el campo id de la tabla
router.post('/', async (req: Request, res: Response)=>{
    try{
        const {correo,contrasena,fk_id_rol} = req.body;
        const nuevo = await rol_usuarioServices.agregarRolUsuario({
            correo,
            contrasena,
            fk_id_rol
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
        const{id_usuario,correo,contrasena,fk_id_rol} = req.body;
        const modificado = await rol_usuarioServices.modificarRolUsuario({
            id_usuario,
            correo,
            contrasena,
            fk_id_rol
        });
        res.send(modificado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

//Eliminar un registro.
router.delete('/', async (req: Request, res: Response) => {
    try{
        const {id_usuario} = req.body;
        const eliminado = await rol_usuarioServices.borrarRolUsuario(Number(id_usuario));
        res.send(eliminado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});





export default router;