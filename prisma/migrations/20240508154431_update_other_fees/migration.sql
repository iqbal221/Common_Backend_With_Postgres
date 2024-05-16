/*
  Warnings:

  - You are about to drop the `other_fees` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "other_fees";

-- CreateTable
CREATE TABLE "other_feess" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "admission" TEXT NOT NULL,
    "roll" TEXT NOT NULL,
    "fees" TEXT NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "other_feess_pkey" PRIMARY KEY ("id")
);
