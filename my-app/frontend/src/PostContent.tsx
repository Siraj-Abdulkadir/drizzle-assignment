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


function PostContent() {

const MY_LINK = "http://localhost:3000/home"

interface Post {
  post_id: number;
  title: string;
  content: string;
  user_id:number;
}

const [post_data,setPostData] = useState<Post[]>([]);

useEffect(()=>{
   const fetchData = async () =>{
    const api_data_result = await fetch(MY_LINK)
    api_data_result.json().then(json =>{
           setPostData(json)
    })
  } 
  fetchData()
  },[])

console.log(post_data)
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
            <div className="comment_section">
            <Field>
                
            <ButtonGroup>
                <Input id="form-name" placeholder="Type to comment..." />
                <Button variant="outline">comment</Button>
            </ButtonGroup>
            </Field>
            </div>
            <AlertAction>
                <Badge variant="secondary">User Name</Badge>
            </AlertAction>
        </Alert>
    </div>
        
    ))    
}
</div>
)}

export default PostContent;