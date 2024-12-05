/*
  Warnings:

  - The values [MODIFY] on the enum `DraftAction` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DraftAction_new" AS ENUM ('EDIT', 'DELETE');
ALTER TABLE "DraftHistory" ALTER COLUMN "action" TYPE "DraftAction_new" USING ("action"::text::"DraftAction_new");
ALTER TYPE "DraftAction" RENAME TO "DraftAction_old";
ALTER TYPE "DraftAction_new" RENAME TO "DraftAction";
DROP TYPE "DraftAction_old";
COMMIT;
