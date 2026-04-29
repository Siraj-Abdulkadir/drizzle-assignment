import { Button } from "./components/ui/button"
import './App.css'
import { Input } from "./components/ui/input"
import { useEffect,useState } from "react"
import { Badge } from "./components/ui/badge"
import {
  Alert,
  AlertDescription,
  AlertTitle,
  AlertAction
} from "./components/ui/alert"
import { ButtonGroup } from "./components/ui/button-group"
import { Field } from "./components/ui/field"
import { Separator } from "./components/ui/separator"
import { Avatar,AvatarFallback,AvatarImage } from "./components/ui/avatar"


function PostContent() {

const MY_LINK = "http://localhost:3000/home"

interface PostComments{
  content:string;
  user_ID:number;
}

interface Post {
  post_id: number;
  title: string;
  content: string;
  user_id:number;
  user:{
    id:number;
    name:string;
    email:string
  };
  post_comments:PostComments[]
  ;
}

const [post_data,setPostData] = useState<Post[]>([]);
const [comment, setComment] =useState("")

useEffect(()=>{
   const fetchData = async () =>{
    const api_data_result = await fetch(MY_LINK)
    api_data_result.json().then(json =>{
           setPostData(json)
    })
  } 
  fetchData()
  },[])

  // Comment Posting
  const addComment = async () => {
    const body = JSON.stringify({ comment });

    const response = await fetch('http://localhost:3000/add-comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body
    });

    if (response.ok) {
      alert("comment has been added!")
    } else {
      alert("Something wrong happened!!! Try Again")
    }
  };

  //Rendering
return(

    
<div >
{
 post_data.map((post)=>(

    <div key={post.post_id} className="post_content_div">
        <Alert className="max-w-md">
            <AlertTitle>{post.title}</AlertTitle>
            <AlertDescription>
                {post.content}
            </AlertDescription>

            <Separator></Separator>{
              post.post_comments.length === 0?
              <>
              </>
              :
              <>
              <strong style={{ color: '#47bbff',textDecoration: 'underline' }}><em>Comments:</em></strong>
              {post.post_comments.map((subItem, index) => (
                <div style={{ display:'flex', gap:'10px', margin:'2px 0 2px 0'}}  key={index} >
                  <Avatar>
                        <AvatarImage
                          src="https://github.com/"
                          alt="@shadcn"
                          className="grayscale"
                        />
                        <AvatarFallback>CM</AvatarFallback>
                        
                      </Avatar>
                  <span style={{ display:'flex',alignItems:'center'}}>{subItem.content}</span>
                </div>
              ))}
              </>
             }
            <div className="comment_section">
            <Field>
                
            <ButtonGroup>
                <Input 
                id="form-name" placeholder="Type to comment..." 
                onChange={(e) => setComment(e.target.value)}
                />
                <Button onClick={addComment} variant="outline">comment</Button>
            </ButtonGroup>
            </Field>
            </div>
            <AlertAction>
                <Badge variant="outline">{post.user.name}</Badge>
            </AlertAction>
        </Alert>

    </div>
        
    ))    
}
</div>
)}

export default PostContent;