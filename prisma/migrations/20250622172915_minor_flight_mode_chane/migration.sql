-- AlterTable
ALTER TABLE "Flight" ALTER COLUMN "flight_number" DROP NOT NULL,
ALTER COLUMN "flight_number" SET DEFAULT 'FE1234';
