import express, {Request,Response} from 'express';
import * as rolServices from '../../services/Rol/rolServices';
//Activamos las rutas
const router = express.Router();

//Rutas

//Para mostrar todos los registros
//http://localhost:3001/api/rol/
router.get('/', async (_req: Request, res: Response)=>{
    let rol = await rolServices.obtieneRol();
    res.send(rol)
});

//Para mostrar un registro en especifico
//http://localhost:3001/api/rol/1 <------Numero id del personal
router.get('/:id_rol', async (req: Request, res: Response)=>{
    let rol = await rolServices.encuentraRol(Number(req.params.id_rol));
    res.send(rol);
});

//Para insertar
//Rutas para hacer insercciones: Post es para insertar: No se le pone el campo id de la tabla
router.post('/', async (req: Request, res: Response)=>{
    try{
        const {nombre} = req.body;
        const nuevo = await rolServices.agregarRol({
            nombre
        });
        res.send(nuevo);
    }catch(e){
        res.send("No se puede agregar el rol");
        // res.status(400).send('Error en los datos');
    }
});

//Para modificar datos: Se le pone el id de la misma tabla
router.put('/', async (req: Request, res: Response) => {
    try{
        const{id_rol,nombre} = req.body;
        const modificado = await rolServices.modificarRol({
            id_rol,
            nombre
        });
        res.send(modificado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

//Eliminar un registro.
router.delete('/', async (req: Request, res: Response) => {
    try{
        const {id_rol} = req.body;
        const eliminado = await rolServices.borrarRol(Number(id_rol));
        res.send(eliminado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});


export default router;