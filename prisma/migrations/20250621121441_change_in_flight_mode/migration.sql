/*
  Warnings:

  - Added the required column `price` to the `Flight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalSeats` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flight" ADD COLUMN     "bowdingGate" TEXT,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "totalSeats" INTEGER NOT NULL;
