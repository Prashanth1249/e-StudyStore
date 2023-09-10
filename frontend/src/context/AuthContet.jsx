import React, { createContext, useEffect, useState } from 'react';
import axios from 'react';

const AuthContext = createContext(null);

export const AuthContextProvider = (props) =>{
    const [isLoggedIn, setLoggedin] = useState(false);

    const getLogged = async() =>{
        const response = await axios.get('http://localhost:9002/checkAuthentication');
        console.log(response.data);
    }
    useEffect(()=>{
        getLogged();
    },[]);
    return(
        <AuthContext.Provider value = {isLoggedIn}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContext;
