/*
  Warnings:

  - You are about to drop the column `numbReviews` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "numbReviews",
ADD COLUMN     "numReviews" INTEGER NOT NULL DEFAULT 0;
