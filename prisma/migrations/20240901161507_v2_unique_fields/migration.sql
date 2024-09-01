/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Consumer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cnpj]` on the table `Storekeeper` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Consumer_cpf_key" ON "Consumer"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Storekeeper_cnpj_key" ON "Storekeeper"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
