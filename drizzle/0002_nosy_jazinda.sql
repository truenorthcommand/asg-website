CREATE TABLE `blog_post_edits` (
	`id` int AUTO_INCREMENT NOT NULL,
	`post_id` int NOT NULL,
	`edited_by` int NOT NULL,
	`changes_summary` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `blog_post_edits_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `blog_posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`title` text NOT NULL,
	`excerpt` text NOT NULL,
	`content` text NOT NULL,
	`category` enum('maintenance','case-study','emergency') NOT NULL,
	`featured_image` varchar(500) NOT NULL,
	`meta_description` varchar(160) NOT NULL,
	`read_time` int NOT NULL,
	`author` enum('AI','Human') NOT NULL DEFAULT 'AI',
	`status` enum('draft','scheduled','published') NOT NULL DEFAULT 'draft',
	`publish_date` timestamp NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`edited_by` int,
	`views` int DEFAULT 0,
	CONSTRAINT `blog_posts_id` PRIMARY KEY(`id`),
	CONSTRAINT `blog_posts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
--> statement-breakpoint
ALTER TABLE `blog_post_edits` ADD CONSTRAINT `blog_post_edits_post_id_blog_posts_id_fk` FOREIGN KEY (`post_id`) REFERENCES `blog_posts`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `blog_post_edits` ADD CONSTRAINT `blog_post_edits_edited_by_users_id_fk` FOREIGN KEY (`edited_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `blog_edits_post_id_idx` ON `blog_post_edits` (`post_id`);--> statement-breakpoint
CREATE INDEX `blog_slug_idx` ON `blog_posts` (`slug`);--> statement-breakpoint
CREATE INDEX `blog_status_idx` ON `blog_posts` (`status`);--> statement-breakpoint
CREATE INDEX `blog_category_idx` ON `blog_posts` (`category`);--> statement-breakpoint
CREATE INDEX `blog_publish_date_idx` ON `blog_posts` (`publish_date`);