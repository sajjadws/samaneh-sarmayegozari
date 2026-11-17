-- AlterTable
ALTER TABLE `role` ADD COLUMN `isSuperAdmin` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isSystem` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `rolepermission` ADD COLUMN `scope` ENUM('OWN', 'GLOBAL') NULL;

-- AlterTable
ALTER TABLE `userpermission` ADD COLUMN `scope` ENUM('OWN', 'GLOBAL') NULL;
