/*
  Warnings:

  - A unique constraint covering the columns `[flight_number]` on the table `Flight` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `flight_number` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flight" ADD COLUMN     "flight_number" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Flight_flight_number_key" ON "Flight"("flight_number");
