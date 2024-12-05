-- CreateEnum
CREATE TYPE "DraftAction" AS ENUM ('MODIFY', 'DELETE');

-- AlterTable
ALTER TABLE "DraftHistory" ADD COLUMN     "action" "DraftAction";
