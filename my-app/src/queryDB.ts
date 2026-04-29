import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './db/schema';
import {eq} from 'drizzle-orm'
import {posts , users, comments} from './db/schema'

const db = drizzle(process.env.DB_FILE_NAME! , {schema});


export const fetchAllPosts = async () => {

  const result = await db.select().from(posts);
  
  return result
};



export const fetchAllUsers = async () => {

  const result = await db.select().from(users);
  
  return result
};



export const getUserByID = async (user_id:number) => {

  const user = db.select().from(users).where(eq(users.id, user_id));
  
  return user
};


export const getUserByEmail = async (user_email:string) => {

  const user = await db.select().from(users).where(eq(users.email, user_email));

  if(user.length === 0){
    return undefined
  }

  return user
};

export const formattedAvailablePosts = async () => {

  const data = await db.query.posts.findMany({
  with: {
    user: true, 
    
    post_comments: true,
  },
});


  return data
};