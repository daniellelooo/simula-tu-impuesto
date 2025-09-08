-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Calculation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "ventasMensuales" REAL NOT NULL,
    "tipoActividad" TEXT NOT NULL,
    "tiempoActividad" TEXT NOT NULL,
    "porcentajeImpuesto" REAL NOT NULL,
    "impuestoMensual" REAL NOT NULL,
    "impuestoAnual" REAL NOT NULL,
    "deducciones" REAL,
    "ingresosBrutos" REAL,
    "gastosDeducibles" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Calculation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
