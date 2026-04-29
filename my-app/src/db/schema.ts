import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const users = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
});

export const posts = sqliteTable("posts_table", {
  post_id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  content: text().notNull(),
  userID : int().notNull().references(() => users.id),
  like_count:int()
});

export const comments = sqliteTable("comments_table", {
  comment_id: int().primaryKey({ autoIncrement: true }),
  content: text().notNull(),
  postID : int().notNull().references(() => posts.post_id),
  userID : int().notNull().references(() => users.id)
});

export const saved_posts = sqliteTable("saved_posts", {
  saved_post_id: int().primaryKey({ autoIncrement: true }),
  postID : int().notNull().references(() => posts.post_id),
  userID : int().notNull().references(() => users.id)
});

export const PostRelations = relations(posts, ({ many, one }) => ({
  post_comments: many(comments),
  user: one(users, {
    fields: [posts.userID],
    references: [users.id],
  }),
}));


export const CommentRelations = relations(comments, ({ one }) => ({
  comment_belongs_to : one(posts, {
    fields: [comments.postID], 
    references: [posts.post_id],
  }),
}));