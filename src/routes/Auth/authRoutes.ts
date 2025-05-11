// src/routes/Auth/authRoutes.ts
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from '../../config';



const router = express.Router();

const conexion = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: Number(DB_PORT),
  multipleStatements: false,
});

router.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const [rows]: any = await conexion.query(
      'SELECT usuario.*, rol.nombre AS rol FROM usuario JOIN rol ON usuario.fk_id_rol = rol.id_rol WHERE correo = ?',
      [correo]
    );

    if (rows.length === 0) return res.status(404).json({ msg: 'Usuario no encontrado' });

    const usuario = rows[0];

    const valid = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!valid) return res.status(401).json({ msg: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: usuario.id_usuario, rol: usuario.rol },
      process.env.JWT_SECRET || 'secreto_estetica',
      { expiresIn: '4h' }
    );

    return res.json({ token, rol: usuario.rol });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Error interno del servidor' });
  }
});

export default router;
