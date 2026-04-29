import {createContext,  useContext} from "react";
import { loggedUserInterface } from "./LoginForm";

const defaultLoggedUser = {
  isUserLoggedIn: false,
  userID: 1,
  userName: "",
}

export const UserContext = createContext<loggedUserInterface>(defaultLoggedUser);

export function useUserContext (){
    const user = useContext(UserContext)

    if(user === undefined){
        throw new Error(
            "User is undefined,Can't find it buddy"
        )
}
return user;
}