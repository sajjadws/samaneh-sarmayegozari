/*
  Warnings:

  - You are about to drop the column `isSuperAdmin` on the `role` table. All the data in the column will be lost.
  - You are about to drop the column `isSystem` on the `role` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `role` DROP COLUMN `isSuperAdmin`,
    DROP COLUMN `isSystem`;
