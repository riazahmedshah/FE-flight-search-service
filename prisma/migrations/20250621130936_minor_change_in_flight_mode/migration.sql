/*
  Warnings:

  - You are about to drop the column `airport_id` on the `Flight` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Flight" DROP CONSTRAINT "Flight_airport_id_fkey";

-- AlterTable
ALTER TABLE "Flight" DROP COLUMN "airport_id";
