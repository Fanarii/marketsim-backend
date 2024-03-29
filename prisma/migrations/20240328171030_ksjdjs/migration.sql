/*
  Warnings:

  - Added the required column `marketPrice` to the `UserProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserProduct" ADD COLUMN     "marketPrice" INTEGER NOT NULL;
