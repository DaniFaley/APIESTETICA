import express, {Request,Response} from 'express';
import * as corteServices from '../../services/Corte/corteServices';
//Activamos las rutas
const router = express.Router();

//Rutas

//Para mostrar todos los registros
//http://localhost:3001/api/corte/
router.get('/', async (_req: Request, res: Response)=>{
    let corte = await corteServices.obtieneCorte();
    res.send(corte)
});

//Para mostrar un registro en especifico
//http://localhost:3001/api/corte/1 <------Numero id del personal
router.get('/:id_corte', async (req: Request, res: Response)=>{
    let corte = await corteServices.encuentraCorte(Number(req.params.id_corte));
    res.send(corte);
});

//Para insertar
//Rutas para hacer insercciones: Post es para insertar: No se le pone el campo id de la tabla
router.post('/', async (req: Request, res: Response)=>{
    try{
        const {nombre_cliente,fk_id_sexo,fk_id_servicio,monto,fecha,comentario} = req.body;
        const nuevo = await corteServices.agregarCorte({
            nombre_cliente,
            fk_id_sexo,
            fk_id_servicio,
            monto,
            fecha,
            comentario
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
        const{id_corte,nombre_cliente,fk_id_sexo,fk_id_servicio,monto,fecha,comentario} = req.body;
        const modificado = await corteServices.modificarCorte({
            id_corte,
            nombre_cliente,
            fk_id_sexo,
            fk_id_servicio,
            monto,
            fecha,
            comentario
        });
        res.send(modificado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});

//Eliminar un registro.
router.delete('/', async (req: Request, res: Response) => {
    try{
        const {id_corte} = req.body;
        const eliminado = await corteServices.borrarCorte(Number(id_corte));
        res.send(eliminado);
    }catch(e){
        res.status(400).send("Error en los datos");
    }
});





export default router;