import express from 'express';
import prisma from '../config/database.js';

const router = express.Router();

// GET - Obtener todos los visitantes
router.get('/', async (req, res) => {
  try {
    const visitantes = await prisma.visitante.findMany({
      include: {
        citas: {
          select: {
            id: true,
            fecha: true,
            hora: true,
            estado: true
          }
        }
      }
    });
    res.json(visitantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Obtener un visitante por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const visitante = await prisma.visitante.findUnique({
      where: { id: parseInt(id) },
      include: {
        citas: true
      }
    });
    
    if (!visitante) {
      return res.status(404).json({ error: 'Visitante no encontrado' });
    }
    
    res.json(visitante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Crear un nuevo visitante
router.post('/', async (req, res) => {
  try {
    const { nombre, genero, fechaNacimiento, correo, telefono, ine } = req.body;
    const visitante = await prisma.visitante.create({
      data: { 
        nombre, 
        genero, 
        fechaNacimiento: fechaNacimiento ? new Date(fechaNacimiento) : null,
        correo, 
        telefono, 
        ine 
      }
    });
    res.status(201).json(visitante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT - Actualizar un visitante
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, genero, fechaNacimiento, correo, telefono, ine } = req.body;
    const visitante = await prisma.visitante.update({
      where: { id: parseInt(id) },
      data: { 
        nombre, 
        genero, 
        fechaNacimiento: fechaNacimiento ? new Date(fechaNacimiento) : null,
        correo, 
        telefono, 
        ine 
      }
    });
    res.json(visitante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Eliminar un visitante
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.visitante.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
