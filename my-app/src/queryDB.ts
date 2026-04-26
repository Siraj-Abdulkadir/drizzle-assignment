import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { users, posts, comments,saved_posts } from './db/schema';
const db = drizzle(process.env.DB_FILE_NAME!);


export const fetchAllPosts = async () => {

  const result = await db.select().from(posts);
  
  return result
};



export const fetchAllUsers = async () => {

  const result = await db.select().from(users);
  
  return result
};