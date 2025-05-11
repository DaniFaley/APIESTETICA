import express, {Request,Response} from 'express';
import * as servicioServices from '../../services/Servicio/servicioServices';
//Activamos las rutas
const router = express.Router();

//Rutas

//Para mostrar todos los registros
//http://localhost:3001/api/servicio/
router.get('/', async (_req: Request, res: Response)=>{
    let servicio = await servicioServices.obtieneServicio();
    res.send(servicio)
});

//Para mostrar un registro en especifico
//http://localhost:3001/api/servicio/1 <------Numero id del personal
router.get('/:id_servicio', async (req: Request, res: Response)=>{
    let servicio = await servicioServices.encuentraServicio(Number(req.params.id_servicio));
    res.send(servicio);
});

//Para insertar
//Rutas para hacer insercciones: Post es para insertar: No se le pone el campo id de la tabla
router.post('/', async (req: Request, res: Response)=>{
    try{
        const {nombre} = req.body;
        const nuevo = await servicioServices.agregarServicio({
            nombre
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
        const{id_servicio,nombre} = req.body;
        const modificado = await servicioServices.modificarServicio({
            id_servicio,
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
        const {id_servicio} = req.body;
        const eliminado = await servicioServices.borrarServicio(Number(id_servicio));
        res.send(eliminado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

export default router;