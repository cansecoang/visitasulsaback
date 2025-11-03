import express from 'express';
import prisma from '../config/database.js';

const router = express.Router();

// GET - Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Obtener un usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { email, name } = req.body;
    const user = await prisma.user.create({
      data: { email, name },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT - Actualizar un usuario
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name } = req.body;
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { email, name },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Eliminar un usuario
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
