-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_lisenceId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "marketPrice" INTEGER,
ALTER COLUMN "lisenceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_lisenceId_fkey" FOREIGN KEY ("lisenceId") REFERENCES "Lisence"("id") ON DELETE SET NULL ON UPDATE CASCADE;
