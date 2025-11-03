import prisma from './src/config/database.js';

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...\n');

  // Crear usuarios administradores
  console.log('📝 Creando usuarios administradores...');
  const usuario1 = await prisma.usuario.create({
    data: {
      nombre: 'Juan Pérez',
      correo: 'juan.admin@ulsa.edu.mx',
      contrasena: 'password123', // En producción, usar bcrypt
      rol: 'admin_sistema'
    }
  });

  const usuario2 = await prisma.usuario.create({
    data: {
      nombre: 'María González',
      correo: 'maria.admin@ulsa.edu.mx',
      contrasena: 'password123',
      rol: 'admin_universitario'
    }
  });
  console.log(`✅ Creados ${2} usuarios\n`);

  // Crear visitantes
  console.log('📝 Creando visitantes...');
  const visitante1 = await prisma.visitante.create({
    data: {
      nombre: 'Carlos Ramírez',
      genero: 'Masculino',
      fechaNacimiento: new Date('1990-05-15'),
      correo: 'carlos.ramirez@email.com',
      telefono: '5512345678',
      ine: 'RAMC900515HDFMRL01'
    }
  });

  const visitante2 = await prisma.visitante.create({
    data: {
      nombre: 'Ana Martínez',
      genero: 'Femenino',
      fechaNacimiento: new Date('1985-08-20'),
      correo: 'ana.martinez@email.com',
      telefono: '5587654321',
      ine: 'MARA850820MDFRTNN02'
    }
  });
  console.log(`✅ Creados ${2} visitantes\n`);

  // Crear citas
  console.log('📝 Creando citas...');
  
  // Cita peatonal
  const cita1 = await prisma.cita.create({
    data: {
      visitanteId: visitante1.id,
      usuarioId: usuario1.id,
      fecha: new Date('2025-11-10'),
      hora: new Date('1970-01-01T10:00:00'),
      personaAVisitar: 'Dr. Roberto Sánchez',
      area: 'Rectoría',
      medioIngreso: 'peatonal',
      estado: 'programada'
    }
  });

  // Cita vehicular
  const cita2 = await prisma.cita.create({
    data: {
      visitanteId: visitante2.id,
      usuarioId: usuario2.id,
      fecha: new Date('2025-11-12'),
      hora: new Date('1970-01-01T14:30:00'),
      personaAVisitar: 'Lic. Patricia López',
      area: 'Administración',
      medioIngreso: 'vehicular',
      marcaVehiculo: 'Toyota',
      modeloVehiculo: 'Corolla',
      colorVehiculo: 'Plata',
      placasVehiculo: 'ABC-123-XYZ',
      estado: 'programada'
    }
  });

  console.log(`✅ Creadas ${2} citas\n`);

  console.log('🎉 Seed completado exitosamente!');
  console.log('\n📊 Resumen:');
  console.log(`   - Usuarios: ${2}`);
  console.log(`   - Visitantes: ${2}`);
  console.log(`   - Citas: ${2}`);
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
