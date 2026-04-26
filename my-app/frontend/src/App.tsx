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


function CardDemo() {

  return (

    <div className="content_div">

      <Menubar>
        <MenubarMenu>
          <div className="menu_items_div">
          <MenubarTrigger>Home</MenubarTrigger>
          <MenubarTrigger>Trending</MenubarTrigger>
          <MenubarTrigger>Discover</MenubarTrigger>
          <Button variant="default">Sign In</Button>
          {/* <MenubarContent>
            <MenubarGroup>
              <MenubarItem>
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>New Window</MenubarItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarItem>Share</MenubarItem>
              <MenubarItem>Print</MenubarItem>
            </MenubarGroup>
          </MenubarContent> */}
          </div>
        </MenubarMenu>
  </Menubar>

  <br />
  <br />

  <h2 className="H2_header">Available Posts</h2>
  
  <br></br>

 {/* Posts Available */}
   <PostContent></PostContent>

   </div>

  )
}

export default CardDemo;