/*
  Warnings:

  - You are about to drop the column `transaction_completed` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "transaction_completed",
ADD COLUMN     "transaction_status" "TransactionStatus" NOT NULL DEFAULT E'INCOMPLETE';
