/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserUtilities` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `UserUtilities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `userutilities` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `UserUtilities_userId_key` ON `UserUtilities`(`userId`);

-- AddForeignKey
ALTER TABLE `UserUtilities` ADD CONSTRAINT `UserUtilities_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
