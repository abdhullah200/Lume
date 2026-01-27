import { getCurrentUser } from '@/lib/appwrite/api';
import type { IContextTypes, IUser } from '@/types'
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const INITAL_USER = {
    id       : '',
    name     : '',
    email    : '',
    username : '',
    imageUrl : '',
    bio      : ''
}

const INITAL_STATE = {
    user               : INITAL_USER,
    isLoading          : false,
    isAuthenticated    : false,
    setUser            : ()=>{},
    setIsAuthenticated : ()=>{},
    checkAuthUser      : async()=> false as boolean,
}

const AuthContext = createContext<IContextTypes>(INITAL_STATE);

const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user,setUser] = useState<IUser>(INITAL_USER);
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    const navigate = useNavigate();

    const checkAuthUser = async ()=>{
        try{
            const currentUserAccount = await getCurrentUser();

            if(currentUserAccount){
                setUser({
                    id       : currentUserAccount.$id,
                    name     : currentUserAccount.name,
                    username : currentUserAccount.username,
                    email    : currentUserAccount.email,
                    imageUrl : currentUserAccount.imageUrl,
                    bio      : currentUserAccount.bio,
                })

                setIsAuthenticated(true);
                return true;
            }
            return false;

        }catch(error){
            console.log(error);
            return false;
        }finally{
            setIsLoading(false);
        }
    };

    useEffect(()=>{
        if(
            localStorage.getItem('cookieFallback') === '[]' 
            
        )navigate('/sign-in')

        checkAuthUser();
    },[]
);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;


export const useUserContext = ()=> useContext(AuthContext);