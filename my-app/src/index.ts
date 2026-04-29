import { Hono } from 'hono'
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { users, posts, comments,saved_posts } from './db/schema';
import { cors } from 'hono/cors'
import { fetchAllPosts, fetchAllUsers, formattedAvailablePosts, getUserByEmail } from './queryDB';
import { 
  Session,
  sessionMiddleware, 
  CookieStore 
} from 'hono-sessions'
import { STATUS_CODES } from 'node:http';


const db = drizzle(process.env.DB_FILE_NAME!);

type Variables = {
 session: any
}


const app = new Hono<{ Variables: Variables }>()


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


const store = new CookieStore()

app.use('*', sessionMiddleware({
  store,
  encryptionKey: 'password_at_least_32_characters_long', 
  expireAfterSeconds: 900, 
  autoExtendExpiration: true, 
  cookieOptions: {
    sameSite: 'Lax', 
    path: '/',
    httpOnly: true, 
  },
}))



app.get('/home',async (c) => {
   
  const data = await formattedAvailablePosts()

  return c.json(data)
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

   return c.json({ message: 'user created succesfully!' }, 201 ), c.redirect('/login')

  }
  catch(err){
    
    return c.json({ message: 'Something went wrong' }, 500)
  }

})

app.post('/login' , async (c) =>{

  const body = await c.req.json()
  const { email,password } = body
  const session = c.get('session')

  const user_email = body.email
  const logged_user = await getUserByEmail(user_email)
  console.log(user_email)
  console.log(logged_user)

  if (logged_user != undefined){

    session.set(email, body.email)
    session.set('user_id', logged_user[0].id)
    session.set('user_name', logged_user[0].name)
    session.set('isLoggedIn', true)

    const loggedInUserData ={
      isUserLoggedIn: session.get('isLoggedIn'),
      userID: session.get('user_id'),
      userName: session.get('user_name'),
    }

    return c.json(loggedInUserData,200)

  }else{
     
    return c.json({message:"User doesn't exist"}, 400)
  }



  
})

app.get('/logout', (c) =>{

  c.get('session').deleteSession()
  return c.redirect('/home')
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
