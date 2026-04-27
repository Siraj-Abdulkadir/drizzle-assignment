import { Button } from "./components/ui/button"
import './App.css'
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "./components/ui/menubar"
import PostContent from "./PostContent"
import { Link } from "lucide-react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from "./Registration"
import AddPost from "./AddPost"


function CardDemo() {

  return (

    <div className="content_div">

      <Menubar>
        <MenubarMenu>
          <div className="menu_items_div">
          <MenubarTrigger>Home</MenubarTrigger>
          <MenubarTrigger>Discover</MenubarTrigger>            
          <MenubarTrigger>Trending</MenubarTrigger>
          <Button variant="default">
            <a href="/registration">Sign Up</a>
          </Button>
          <AddPost></AddPost>
          </div>
        </MenubarMenu>
  </Menubar>

  <br />
  <br />
         
  <h2 className="H2_header">Available Posts</h2>
  
  <br></br>

 {/* Posts Available */}
   <PostContent></PostContent>

      <br />
        <br />

   </div>

  )
}

export default CardDemo;