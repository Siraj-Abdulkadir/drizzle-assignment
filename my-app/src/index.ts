import { Hono } from 'hono'
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { users, posts, comments,saved_posts } from './db/schema';
import { cors } from 'hono/cors'
import { fetchAllPosts, fetchAllUsers } from './queryDB';

const db = drizzle(process.env.DB_FILE_NAME!);


const app = new Hono()


// CORS
app.use('/*', cors())
app.use(
  '/*',
  cors({
    origin: ['http://localhost:5173/'],
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  })
)



app.get('/home',async (c) => {
   
  const result = await fetchAllPosts();

  return c.json(result)
})



app.get('/users', async (c) => {

 const result = await fetchAllUsers()

  return c.json(result)
})





app.post('/sign-up', async (c) => {

  await db.insert(users).values({
    id:5,
    name:"chaalaa",
    age:98,
    email: "chaalaa@gmail.com"
  }
  )
  return  c.text('user created succesfully!')
})

app.post('/add-post', async (c) => {

  await db.insert(posts).values({
    post_id:2,
    title:"The North Pole Icebergs Hold A Big Secret.",
    content:"The north pole scientists found that some of the earliest birds and reptiles used to share and hunt together despite being 399% years apart",
    userID:1
  }
  )
  return  c.text('post added succesfully!')
})

app.get('/add-comment', async (c) => {

  await db.insert(comments).values({
    comment_id:1,
    title:"That is incredable,keepgoing",
    content:"I Really like this",
    postID:11,
    userID:1
  }
  )
  return  c.text('comment added succesfully!')
})

app.get('/save-post', async (c) => {

  await db.insert(saved_posts).values({
    saved_post_id:1,
    postID:1,
    userID:1
  }
  )
  return  c.text('post saved succesfully!')
})




export default app
