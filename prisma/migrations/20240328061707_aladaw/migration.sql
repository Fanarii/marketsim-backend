/*
  Warnings:

  - You are about to drop the column `userId` on the `Lisence` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lisence" DROP CONSTRAINT "Lisence_userId_fkey";

-- AlterTable
ALTER TABLE "Lisence" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_LisenceToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LisenceToUser_AB_unique" ON "_LisenceToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_LisenceToUser_B_index" ON "_LisenceToUser"("B");

-- AddForeignKey
ALTER TABLE "_LisenceToUser" ADD CONSTRAINT "_LisenceToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Lisence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LisenceToUser" ADD CONSTRAINT "_LisenceToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
