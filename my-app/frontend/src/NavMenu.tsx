import { Button } from "./components/ui/button"
import './App.css'
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "./components/ui/menubar"
import AddPost from "./AddPost"
import { useUserContext } from "./Context"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./components/ui/avatar"
import { Link } from "react-router-dom"


function NavMenu() {

 const logged_user = useUserContext()


  return (

    <div className="content_div">

      <Menubar>
        <MenubarMenu>
          <div className="menu_items_div">
          <MenubarTrigger> 
           <Link to="/">Home</Link>
          </MenubarTrigger>
          <MenubarTrigger>Discover</MenubarTrigger>            
          <MenubarTrigger>Trending</MenubarTrigger>
          {/* <AddPost></AddPost>
            <Button variant="default">
                  <a href="/registration">Sign Up</a>
                </Button>
            <Button variant="default">
                  <a href="/login">Login</a>
                </Button> */}
          {
              logged_user.isUserLoggedIn === true ?(
                <>
               <AddPost></AddPost>
               <h1></h1>
               <h1></h1>
               <h1></h1>
               <Avatar>
      <AvatarImage
        src="https://github.com/"
        alt="@shadcn"
        className="grayscale"
      />
      <AvatarFallback>{logged_user.userName[0]}</AvatarFallback>
    </Avatar>
          <h6 style={{ display:'flex',alignItems:'center',gap:'5px'}}> Wellcome <em style={{ color: '#47bbff'}}><strong>{logged_user.userName}</strong> </em></h6>
               </>
               )
               :(
                <>
                <Button variant="default">                  
                  <Link to="/registration">Create Account</Link>
                </Button>
                 <Button variant="default">
                  <Link to="/login">Login</Link>
                </Button>
                </>

                )



            }
        
          </div>
        </MenubarMenu>
  </Menubar>

  <br />
  <br />

   </div>

  )
}

export default NavMenu;