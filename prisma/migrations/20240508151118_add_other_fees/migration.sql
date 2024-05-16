-- CreateTable
CREATE TABLE "other_fees" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "admission" TEXT NOT NULL,
    "roll" TEXT NOT NULL,
    "fees" TEXT NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "other_fees_pkey" PRIMARY KEY ("id")
);
