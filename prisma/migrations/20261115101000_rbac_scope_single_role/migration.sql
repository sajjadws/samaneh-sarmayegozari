-- Add per-assignment read scopes. Existing read grants default to OWN (least privilege).
ALTER TABLE `RolePermission`
    ADD COLUMN `scope` ENUM('OWN', 'GLOBAL') NULL;

ALTER TABLE `UserPermission`
    ADD COLUMN `scope` ENUM('OWN', 'GLOBAL') NULL;

UPDATE `RolePermission` rp
INNER JOIN `Permission` p ON p.`id` = rp.`permissionId`
SET rp.`scope` = 'OWN'
WHERE p.`name` LIKE '%.read';

UPDATE `UserPermission` up
INNER JOIN `Permission` p ON p.`id` = up.`permissionId`
SET up.`scope` = 'OWN'
WHERE p.`name` LIKE '%.read';

-- Enforce exactly one role assignment per user. This intentionally fails if a user
-- currently has multiple roles; resolve those assignments explicitly before retrying.
DROP INDEX `UserRole_userId_roleId_key` ON `UserRole`;
CREATE UNIQUE INDEX `UserRole_userId_key` ON `UserRole` (`userId`);
