-- CreateTable
CREATE TABLE "exam_feess" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "admission" TEXT NOT NULL,
    "roll" TEXT NOT NULL,
    "exam" TEXT NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exam_feess_pkey" PRIMARY KEY ("id")
);
