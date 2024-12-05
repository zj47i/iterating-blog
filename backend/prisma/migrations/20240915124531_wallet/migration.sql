/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Draft` table. All the data in the column will be lost.
  - You are about to drop the column `writerId` on the `Draft` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `owner` to the `Draft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `writer` to the `Draft` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ownerId";

-- DropIndex
DROP INDEX "writerId";

-- AlterTable
ALTER TABLE "Draft" DROP COLUMN "ownerId",
DROP COLUMN "writerId",
ADD COLUMN     "owner" TEXT NOT NULL,
ADD COLUMN     "writer" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";
