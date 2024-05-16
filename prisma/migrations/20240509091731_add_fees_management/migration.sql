/*
  Warnings:

  - You are about to drop the `exam_feess` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `monthly_feess` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `other_feess` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "exam_feess";

-- DropTable
DROP TABLE "monthly_feess";

-- DropTable
DROP TABLE "other_feess";

-- CreateTable
CREATE TABLE "fees_management" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "admission" TEXT NOT NULL,
    "roll" TEXT NOT NULL,
    "month" TEXT,
    "year" TEXT,
    "exam" TEXT,
    "fees" TEXT,
    "entryDate" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fees_management_pkey" PRIMARY KEY ("id")
);
