-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "money" BIGINT NOT NULL DEFAULT 2000,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LisenceToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_LisenceToUser_AB_unique" ON "_LisenceToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_LisenceToUser_B_index" ON "_LisenceToUser"("B");

-- AddForeignKey
ALTER TABLE "_LisenceToUser" ADD CONSTRAINT "_LisenceToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Lisence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LisenceToUser" ADD CONSTRAINT "_LisenceToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
