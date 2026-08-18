ALTER TABLE `account` ADD `issuer` text;
--> statement-breakpoint
UPDATE `account` SET `issuer` = CASE
  WHEN `provider_id` = 'credential' THEN 'local:credential'
  ELSE 'local:oauth:' || `provider_id`
END WHERE `issuer` IS NULL;
--> statement-breakpoint
CREATE UNIQUE INDEX `account_issuer_account_id_unique` ON `account` (`issuer`, `account_id`);
