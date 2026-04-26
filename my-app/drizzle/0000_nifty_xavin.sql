CREATE TABLE `comments_table` (
	`comment_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`postID` integer NOT NULL,
	`userID` integer NOT NULL,
	FOREIGN KEY (`postID`) REFERENCES `posts_table`(`post_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`userID`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `posts_table` (
	`post_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`userID` integer NOT NULL,
	`like_count` integer,
	FOREIGN KEY (`userID`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `saved_posts` (
	`saved_post_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`postID` integer NOT NULL,
	`userID` integer NOT NULL,
	FOREIGN KEY (`postID`) REFERENCES `posts_table`(`post_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`userID`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`age` integer NOT NULL,
	`email` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_email_unique` ON `users_table` (`email`);