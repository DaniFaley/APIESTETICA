import express, {Request,Response} from 'express';
import * as sexoServices from '../../services/Sexo/sexoServices';
//Activamos las rutas
const router = express.Router();

//Rutas

//Para mostrar todos los registros
//http://localhost:3001/api/sexo/
router.get('/', async (_req: Request, res: Response)=>{
    let sexo = await sexoServices.obtieneSexo();
    res.send(sexo)
});

//Para mostrar un registro en especifico
//http://localhost:3001/api/sexo/1 <------Numero id del personal
router.get('/:id_sexo', async (req: Request, res: Response)=>{
    let sexo = await sexoServices.encuentraSexo(Number(req.params.id_sexo));
    res.send(sexo);
});

//Para insertar
//Rutas para hacer insercciones: Post es para insertar: No se le pone el campo id de la tabla
router.post('/', async (req: Request, res: Response)=>{
    try{
        const {nombre} = req.body;
        const nuevo = await sexoServices.agregarSexo({
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
        const{id_sexo,nombre} = req.body;
        const modificado = await sexoServices.modificarSexo({
            id_sexo,
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
        const {id_sexo} = req.body;
        const eliminado = await sexoServices.borrarSexo(Number(id_sexo));
        res.send(eliminado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

export default router;