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
import { useState } from 'react'
import { UserContext } from "./Context"
import NavMenu from "./NavMenu"

export interface loggedUserInterface {
  isUserLoggedIn: boolean;
  userID: number;
  userName: string;
}

export default function Login() {

  const defaultLoggedUser = {
  isUserLoggedIn: false,
  userID: 0,
  userName: "",
}


const [loggedUser, setLoggedUser] = useState<loggedUserInterface>(defaultLoggedUser);


  // 1. Create a state for each input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const sendData = async () => {
    const body = JSON.stringify({ email , password});

    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body
    });

    if (response.ok) {
      
      try{

        // trying to login since the form is okkk
         response.json().then(json =>{
             setLoggedUser(json)
            })
            alert("Login succesfull!")
  
      }
      catch(err){
        alert("Server responded with error, sorry!")
      }
    
    } else {
      alert("Something wrong happened!!! Try Again")
    }
  };

    return(

      <div>

     <UserContext.Provider value={loggedUser}>
        <NavMenu/>
     </UserContext.Provider>


      <br />
    <Card className="m-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your Email and Password below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="youremail@email.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="email">Password</Label>
              </div>
              <Input 
              id="password" type="password" required
              onChange={(e) => setPassword(e.target.value)}
               />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button onClick={sendData} type="submit" className="w-full">
          Login
        </Button>
      </CardFooter>
    </Card>

    </div>

    )

}
