/*
  Warnings:

  - You are about to drop the column `projectPhaseId` on the `investmenttransaction` table. All the data in the column will be lost.
  - You are about to drop the `projectphaseinvestment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `projectId` to the `InvestmentTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `investmenttransaction` DROP FOREIGN KEY `InvestmentTransaction_projectPhaseId_fkey`;

-- DropForeignKey
ALTER TABLE `projectphaseinvestment` DROP FOREIGN KEY `ProjectPhaseInvestment_investmentId_fkey`;

-- DropForeignKey
ALTER TABLE `projectphaseinvestment` DROP FOREIGN KEY `ProjectPhaseInvestment_projectPhaseId_fkey`;

-- DropIndex
DROP INDEX `InvestmentTransaction_projectPhaseId_idx` ON `investmenttransaction`;

-- AlterTable
ALTER TABLE `investmenttransaction` DROP COLUMN `projectPhaseId`,
    ADD COLUMN `projectId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `project` MODIFY `status` ENUM('FUNDRAISING', 'IN_PROGRESS', 'COMPLETED', 'DRAFT') NOT NULL DEFAULT 'FUNDRAISING';

-- AlterTable
ALTER TABLE `projectphase` ADD COLUMN `ProjectedRevenue` VARCHAR(191) NOT NULL DEFAULT '0',
    MODIFY `status` ENUM('FUNDRAISING', 'IN_PROGRESS', 'COMPLETED', 'DRAFT') NOT NULL DEFAULT 'FUNDRAISING';

-- DropTable
DROP TABLE `projectphaseinvestment`;

-- CreateTable
CREATE TABLE `ProjectInvestment` (
    `id` VARCHAR(191) NOT NULL,
    `investmentId` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ProjectInvestment_investmentId_projectId_key`(`investmentId`, `projectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `InvestmentTransaction_projectId_idx` ON `InvestmentTransaction`(`projectId`);

-- AddForeignKey
ALTER TABLE `InvestmentTransaction` ADD CONSTRAINT `InvestmentTransaction_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectInvestment` ADD CONSTRAINT `ProjectInvestment_investmentId_fkey` FOREIGN KEY (`investmentId`) REFERENCES `Investment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectInvestment` ADD CONSTRAINT `ProjectInvestment_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
