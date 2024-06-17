import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider =({children}) => {
    const [isLoggedIn,setLoggedIn]=useState(false);

    useEffect(()=>{
        const storedUsername=sessionStorage.getItem('username');
        if(storedUsername){
            setLoggedIn(true);
        }
    },[]);

    const login =(username)=>{
        sessionStorage.setItem('username',username);
        setLoggedIn(true);
    }

    const logout = () =>{
        sessionStorage.removeItem('username');
        setLoggedIn(false);
    }

    return(
        <AuthContext.Provider value={{isLoggedIn,login,logout}}>
            {children}
        </AuthContext.Provider>

    )


}