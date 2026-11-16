/*
  Warnings:

  - You are about to drop the `bankaccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fileproject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `investment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `investmenttransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projectphase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projectphaseinvestment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `questionproject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teamproject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wallet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wallettransaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `bankaccount` DROP FOREIGN KEY `BankAccount_walletId_fkey`;

-- DropForeignKey
ALTER TABLE `fileproject` DROP FOREIGN KEY `FileProject_projectPhaseId_fkey`;

-- DropForeignKey
ALTER TABLE `investment` DROP FOREIGN KEY `Investment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `investmenttransaction` DROP FOREIGN KEY `InvestmentTransaction_investmentId_fkey`;

-- DropForeignKey
ALTER TABLE `investmenttransaction` DROP FOREIGN KEY `InvestmentTransaction_projectPhaseId_fkey`;

-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `Project_usrId_fkey`;

-- DropForeignKey
ALTER TABLE `projectphase` DROP FOREIGN KEY `ProjectPhase_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `projectphaseinvestment` DROP FOREIGN KEY `ProjectPhaseInvestment_investmentId_fkey`;

-- DropForeignKey
ALTER TABLE `projectphaseinvestment` DROP FOREIGN KEY `ProjectPhaseInvestment_projectPhaseId_fkey`;

-- DropForeignKey
ALTER TABLE `questionproject` DROP FOREIGN KEY `QuestionProject_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `teamproject` DROP FOREIGN KEY `TeamProject_projectPhaseId_fkey`;

-- DropForeignKey
ALTER TABLE `wallet` DROP FOREIGN KEY `Wallet_userId_fkey`;

-- DropForeignKey
ALTER TABLE `wallettransaction` DROP FOREIGN KEY `WalletTransaction_walletId_fkey`;

-- DropTable
DROP TABLE `bankaccount`;

-- DropTable
DROP TABLE `fileproject`;

-- DropTable
DROP TABLE `investment`;

-- DropTable
DROP TABLE `investmenttransaction`;

-- DropTable
DROP TABLE `project`;

-- DropTable
DROP TABLE `projectphase`;

-- DropTable
DROP TABLE `projectphaseinvestment`;

-- DropTable
DROP TABLE `questionproject`;

-- DropTable
DROP TABLE `teamproject`;

-- DropTable
DROP TABLE `wallet`;

-- DropTable
DROP TABLE `wallettransaction`;

-- CreateTable
CREATE TABLE `TicketMessage` (
    `id` VARCHAR(191) NOT NULL,
    `content` VARCHAR(2000) NOT NULL,
    `ticketId` VARCHAR(191) NOT NULL,
    `senderId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `TicketMessage_ticketId_createdAt_idx`(`ticketId`, `createdAt`),
    INDEX `TicketMessage_senderId_idx`(`senderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Notification_userId_status_createdAt_idx` ON `Notification`(`userId`, `status`, `createdAt`);

-- CreateIndex
CREATE INDEX `Ticket_status_createdAt_idx` ON `Ticket`(`status`, `createdAt`);

-- AddForeignKey
ALTER TABLE `TicketMessage` ADD CONSTRAINT `TicketMessage_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketMessage` ADD CONSTRAINT `TicketMessage_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `ticket` RENAME INDEX `Ticket_userId_fkey` TO `Ticket_userId_idx`;
