/*
  Warnings:

  - You are about to drop the column `email_varified_at` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "email_varified_at",
ADD COLUMN     "email_verified_at" TIMESTAMP(3);
