/*
  Warnings:

  - You are about to drop the `DraftHisotry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "DraftHisotry";

-- CreateTable
CREATE TABLE "DraftHistory" (
    "id" SERIAL NOT NULL,
    "draftId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "writer" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DraftHistory_pkey" PRIMARY KEY ("id")
);
