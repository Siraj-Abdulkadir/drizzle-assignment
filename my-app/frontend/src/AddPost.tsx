import { useState } from "react"
import { Button } from "./components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog"
import { Field, FieldGroup } from "./components/ui/field"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { Textarea } from "./components/ui/textarea"

function AddPost() {

    const [postTitle, setPostTitle] = useState('')
    const [postContent, setPostContent] = useState('')

    const add_post = async () => {
    const body = JSON.stringify({ postTitle, postContent });

    const response = await fetch('http://localhost:3000/add-post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body
    });

    if (response.ok) {
      alert("post has been created")
    } else {
      alert("Something wrong happened!!! Try Again")
    }
  };


  return (

    <div className="content_div">

        <Dialog>
      <form>
        <DialogTrigger>
          <Button variant="default">Add Post</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create Post</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="username-1">Title</Label>
               <Input 
                id="name-1"
                onChange={(e) => setPostTitle(e.target.value)}
                />
            </Field>
            <Field>
              <Label htmlFor="username-1">Content</Label>
              <Textarea
               placeholder="Type your message here." 
               onChange={(e) => setPostContent(e.target.value)}
               />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
            onClick={add_post}
             type="button">Post</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>


   </div>

  )
}

export default AddPost;