-- CreateTable
CREATE TABLE "expense" (
    "id" TEXT NOT NULL,
    "serialNo" TEXT NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL,
    "expenseHead" TEXT NOT NULL,
    "expenseType" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expense_pkey" PRIMARY KEY ("id")
);
