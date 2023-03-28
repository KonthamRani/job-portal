/*
1. Initialize your context and export it.
2. Initialize a initial context and export it.
3. Create a reducer function
4. Create a context provider
*/
import { createContext, useReducer } from "react";
export const UserContext=createContext();

const initialValue=JSON.parse(localStorage.getItem('user')) || {
    user:null,
    isAuth:false,
    userInfo:null
}
export const reducer=(state,action)=>{
    switch(action.type){
        case "LOGIN":
             var data={
                user:action.payload,
                isAuth:true
            }
            localStorage.setItem('user',JSON.stringify(data))
           return data
        case "LOGOUT":
            data= {
                user:null,
                isAuth:false,
                userInfo:null
            }
            localStorage.setItem('user',JSON.stringify(data))
           return data
        case "SET_USER_INFO":
            data= {
                ...state,
                userInfo:action.payload
            }
            localStorage.setItem('user',JSON.stringify(data))
            return data
            default:
                return state
    }
}
//userContextProvider is a high order component which takes children as a component and returns modified version of the component
export const UserContextProvider=({children})=>{

    const [userData,dispatch]=useReducer(reducer,initialValue);
    return(
        <UserContext.Provider value={[userData,dispatch]}>
            {children}
        </UserContext.Provider>
    )

}