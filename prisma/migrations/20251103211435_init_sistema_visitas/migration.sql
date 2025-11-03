-- CreateEnum
CREATE TYPE "rol_usuario" AS ENUM ('admin_sistema', 'admin_universitario');

-- CreateEnum
CREATE TYPE "medio_ingreso" AS ENUM ('peatonal', 'vehicular');

-- CreateEnum
CREATE TYPE "estado_cita" AS ENUM ('programada', 'reagendada', 'finalizada');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "correo" VARCHAR(100) NOT NULL,
    "contrasena" VARCHAR(255) NOT NULL,
    "rol" "rol_usuario" NOT NULL,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visitantes" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "genero" VARCHAR(10),
    "fecha_nacimiento" DATE,
    "correo" VARCHAR(100),
    "telefono" VARCHAR(20),
    "ine" VARCHAR(20),
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visitantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "citas" (
    "id" SERIAL NOT NULL,
    "visitante_id" INTEGER NOT NULL,
    "usuario_id" INTEGER,
    "fecha" DATE NOT NULL,
    "hora" TIME NOT NULL,
    "persona_a_visitar" VARCHAR(100) NOT NULL,
    "area" VARCHAR(100),
    "medio_ingreso" "medio_ingreso",
    "marca_vehiculo" VARCHAR(50),
    "modelo_vehiculo" VARCHAR(50),
    "color_vehiculo" VARCHAR(30),
    "placas_vehiculo" VARCHAR(20),
    "estado" "estado_cita" NOT NULL DEFAULT 'programada',
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "citas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_correo_key" ON "usuarios"("correo");

-- AddForeignKey
ALTER TABLE "citas" ADD CONSTRAINT "citas_visitante_id_fkey" FOREIGN KEY ("visitante_id") REFERENCES "visitantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "citas" ADD CONSTRAINT "citas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
