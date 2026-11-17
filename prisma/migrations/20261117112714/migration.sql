-- AlterTable
ALTER TABLE `userutilities` MODIFY `nationalCode` VARCHAR(10) NULL,
    MODIFY `avatar` VARCHAR(191) NOT NULL DEFAULT '/public/media/images/profile.jpg';
