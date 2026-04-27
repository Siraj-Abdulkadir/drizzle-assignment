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

  const body = await c.req.json()
  const { name, email,age } = body

  try{
    await db.insert(users).values({
      name:body.name,
      age:body.age,
      email:body.email
    }
    )
   return c.json({ message: 'user created succesfully!' }, 201)

  }
  catch(err){
    
    return c.json({ message: 'Something went wrong' }, 500)
  }

})

app.post('/add-post', async (c) => {

  const body = await c.req.json()
  const { postTitle,postContent} = body

  try{
  await db.insert(posts).values({
    title:body.postTitle,
    content:body.postContent,
    userID:1
  })
  return c.json({ message: 'post created succesfully!' }, 201)
}
catch(err){
  return c.json({ message: 'Something went wrong' }, 500)
}})

app.post('/add-comment', async (c) => {

   const body = await c.req.json()
  const { comment } = body

  await db.insert(comments).values({
    title:"That is incredable,keepgoing",
    content:body.comment,
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
