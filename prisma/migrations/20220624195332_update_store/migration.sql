/*
  Warnings:

  - Added the required column `opening_hours` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `closing_hours` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Store" DROP COLUMN "opening_hours",
ADD COLUMN     "opening_hours" TIME(0) NOT NULL,
DROP COLUMN "closing_hours",
ADD COLUMN     "closing_hours" TIME(0) NOT NULL;
