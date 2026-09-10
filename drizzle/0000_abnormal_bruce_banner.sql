CREATE TABLE `traffic_events` (
	`id` text PRIMARY KEY NOT NULL,
	`path` text NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `traffic_events_path_idx` ON `traffic_events` (`path`);--> statement-breakpoint
CREATE TABLE `traffic_visitors` (
	`id` text PRIMARY KEY NOT NULL,
	`last_seen` integer NOT NULL,
	`sessions` integer NOT NULL
);
