CREATE TABLE `suggestions` (
	`id` text PRIMARY KEY NOT NULL,
	`source_path` text NOT NULL,
	`name` text,
	`email` text NOT NULL,
	`comment` text NOT NULL,
	`anonymous` integer NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `suggestions_created_at_idx` ON `suggestions` (`created_at`);