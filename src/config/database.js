import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Manejo de conexión
prisma.$connect()
  .then(() => console.log('✅ Conectado a la base de datos'))
  .catch((err) => console.error('❌ Error conectando a la base de datos:', err));

// Manejo de cierre graceful
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default prisma;
