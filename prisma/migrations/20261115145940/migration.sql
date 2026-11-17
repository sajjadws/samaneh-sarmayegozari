/*
  Warnings:

  - You are about to drop the column `scope` on the `rolepermission` table. All the data in the column will be lost.
  - You are about to drop the column `scope` on the `userpermission` table. All the data in the column will be lost.
  - You are about to drop the `userrole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `userrole` DROP FOREIGN KEY `UserRole_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `userrole` DROP FOREIGN KEY `UserRole_userId_fkey`;

-- AlterTable
ALTER TABLE `rolepermission` DROP COLUMN `scope`;

-- AlterTable
ALTER TABLE `userpermission` DROP COLUMN `scope`;

-- DropTable
DROP TABLE `userrole`;
