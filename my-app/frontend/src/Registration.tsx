{/* // signup section */}
import { Button } from "./components/ui/button"
import './App.css'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
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
import { useState } from 'react'
import { toast } from "sonner"


export default function Registration() {


  // 1. Create a state for each input
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const age = 150

  const sendData = async () => {
    const body = JSON.stringify({ name, email,age });

    const response = await fetch('http://localhost:3000/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body
    });

    if (response.ok) {
      alert("User has been created")
    } else {
      alert("Something wrong happened!!! Try Again")
    }
  };

    return(

      <div>
             <Menubar>
                <MenubarMenu>
                  <div className="menu_items_div">
                  <MenubarTrigger>
                    <a href="/">Home</a>
                    </MenubarTrigger>
                  <MenubarTrigger>Discover</MenubarTrigger>            
                  <MenubarTrigger>Trending</MenubarTrigger>
                  <Button variant="default">
                    <a href="/registration">Sign Up</a>
                  </Button>
                  </div>
                </MenubarMenu>
          </Menubar>
    
      <br />
      <br />
      <br />
    <Card className="m-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your Name and Email below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="name"
                placeholder="john-doe"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="email">Email</Label>
              </div>
              <Input 
              id="email" type="email" required
              onChange={(e) => setEmail(e.target.value)}
               />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button onClick={sendData} type="submit" className="w-full">
          Create Account
        </Button>
      </CardFooter>
    </Card>

    </div>

    )

}
