-- CreateTable
CREATE TABLE "DraftHisotry" (
    "id" SERIAL NOT NULL,
    "draftId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "writer" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DraftHisotry_pkey" PRIMARY KEY ("id")
);
