# Backend Express + Prisma

Backend desarrollado con Express.js y Prisma ORM.

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Edita el archivo .env con tus credenciales de base de datos
```

## 🗄️ Configuración de Base de Datos

1. Actualiza el `DATABASE_URL` en el archivo `.env` con tus credenciales
2. Genera el cliente de Prisma:
```bash
npm run prisma:generate
```

3. Ejecuta las migraciones:
```bash
npm run prisma:migrate
```

## 🚀 Uso

### Modo desarrollo (con hot reload)
```bash
npm run dev
```

### Modo producción
```bash
npm start
```

### Otros comandos útiles

```bash
# Abrir Prisma Studio (interfaz visual para la BD)
npm run prisma:studio

# Generar cliente de Prisma
npm run prisma:generate

# Crear y aplicar migraciones
npm run prisma:migrate
```

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── config/
│   │   └── database.js      # Configuración de Prisma
│   ├── routes/
│   │   └── users.routes.js  # Rutas de usuarios
│   └── index.js             # Punto de entrada
├── prisma/
│   └── schema.prisma        # Esquema de la base de datos
├── .env                     # Variables de entorno
├── .env.example            # Ejemplo de variables de entorno
└── package.json
```

## 🔗 Endpoints Disponibles

### General
- `GET /` - Mensaje de bienvenida
- `GET /health` - Estado del servidor

### Usuarios
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener un usuario por ID
- `POST /api/users` - Crear un nuevo usuario
- `PUT /api/users/:id` - Actualizar un usuario
- `DELETE /api/users/:id` - Eliminar un usuario

## 🛠️ Tecnologías

- **Express.js** - Framework web
- **Prisma** - ORM para base de datos
- **PostgreSQL** - Base de datos (configurable)
- **dotenv** - Manejo de variables de entorno
- **CORS** - Manejo de CORS
- **Nodemon** - Hot reload en desarrollo
# visitasulsaback
