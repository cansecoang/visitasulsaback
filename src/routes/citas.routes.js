import express from 'express';
import prisma from '../config/database.js';

const router = express.Router();

// GET - Obtener todas las citas
router.get('/', async (req, res) => {
  try {
    const citas = await prisma.cita.findMany({
      include: {
        visitante: {
          select: {
            id: true,
            nombre: true,
            correo: true,
            telefono: true
          }
        },
        usuario: {
          select: {
            id: true,
            nombre: true,
            correo: true
          }
        }
      },
      orderBy: {
        fecha: 'desc'
      }
    });
    res.json(citas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Obtener una cita por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cita = await prisma.cita.findUnique({
      where: { id: parseInt(id) },
      include: {
        visitante: true,
        usuario: true
      }
    });
    
    if (!cita) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }
    
    res.json(cita);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Crear una nueva cita
router.post('/', async (req, res) => {
  try {
    const {
      visitanteId,
      usuarioId,
      fecha,
      hora,
      personaAVisitar,
      area,
      medioIngreso,
      marcaVehiculo,
      modeloVehiculo,
      colorVehiculo,
      placasVehiculo
    } = req.body;

    const cita = await prisma.cita.create({
      data: {
        visitanteId,
        usuarioId,
        fecha: new Date(fecha),
        hora: new Date(`1970-01-01T${hora}`),
        personaAVisitar,
        area,
        medioIngreso,
        marcaVehiculo,
        modeloVehiculo,
        colorVehiculo,
        placasVehiculo
      },
      include: {
        visitante: true,
        usuario: true
      }
    });
    res.status(201).json(cita);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT - Actualizar una cita
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      visitanteId,
      usuarioId,
      fecha,
      hora,
      personaAVisitar,
      area,
      medioIngreso,
      marcaVehiculo,
      modeloVehiculo,
      colorVehiculo,
      placasVehiculo,
      estado
    } = req.body;

    const cita = await prisma.cita.update({
      where: { id: parseInt(id) },
      data: {
        visitanteId,
        usuarioId,
        fecha: fecha ? new Date(fecha) : undefined,
        hora: hora ? new Date(`1970-01-01T${hora}`) : undefined,
        personaAVisitar,
        area,
        medioIngreso,
        marcaVehiculo,
        modeloVehiculo,
        colorVehiculo,
        placasVehiculo,
        estado
      },
      include: {
        visitante: true,
        usuario: true
      }
    });
    res.json(cita);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH - Actualizar estado de una cita
router.patch('/:id/estado', async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const cita = await prisma.cita.update({
      where: { id: parseInt(id) },
      data: { estado },
      include: {
        visitante: true,
        usuario: true
      }
    });
    res.json(cita);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Eliminar una cita
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.cita.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
