/*
  Warnings:

  - The `image` column on the `new_arrival_product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "new_arrival_product" DROP COLUMN "image",
ADD COLUMN     "image" TEXT[];
