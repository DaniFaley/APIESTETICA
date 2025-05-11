import express from 'express';
import cors from 'cors';
// Rutas
import sexoRoutes from './routes/Sexo/sexoRoutes';
import servicioRoutes from './routes/Servicio/servicioRoutes';
import usuarioRoutes from './routes/Usuario/usuarioRoutes';
import corteRoutes from './routes/Corte/corteRoutes';
import authRoutes from './routes/Auth/authRoutes';

// Importar configuración de variables de entorno
import { PORT } from './config';

// Crear la aplicación con Express
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Usar rutas
app.use('/api/sexo', sexoRoutes);
app.use('/api/servicio', servicioRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/corte', corteRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});