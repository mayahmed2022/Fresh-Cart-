import { createContext, useEffect, useState } from "react"


 export const authContext =  createContext();




export function AuthComtextProvider ( {children}){
  const [token , setToken]  =   useState( null)

  useEffect( function(){
    const val = localStorage.getItem('tkn');
    if( val !== null){
      setToken(val)
    }
  } ,[] ); 

  
    return <authContext.Provider value={  {myToken :token ,  setToken} }>

  {children}
    </authContext.Provider>

}