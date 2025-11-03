import express from 'express';
import prisma from '../config/database.js';

const router = express.Router();

// GET - Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        nombre: true,
        correo: true,
        rol: true,
        creadoEn: true
      }
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Obtener un usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await prisma.usuario.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        nombre: true,
        correo: true,
        rol: true,
        creadoEn: true
      }
    });
    
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { nombre, correo, contrasena, rol } = req.body;
    const usuario = await prisma.usuario.create({
      data: { nombre, correo, contrasena, rol },
      select: {
        id: true,
        nombre: true,
        correo: true,
        rol: true,
        creadoEn: true
      }
    });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT - Actualizar un usuario
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, contrasena, rol } = req.body;
    const usuario = await prisma.usuario.update({
      where: { id: parseInt(id) },
      data: { nombre, correo, contrasena, rol },
      select: {
        id: true,
        nombre: true,
        correo: true,
        rol: true,
        creadoEn: true
      }
    });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Eliminar un usuario
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.usuario.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
