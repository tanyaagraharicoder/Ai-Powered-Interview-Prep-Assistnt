import React , {createContext,useState, useContext, Children, useEffect} from "react";

import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext= createContext();


const  UserProvider =({children})=>{

    const [user,setUser]=useState(null);

    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        if(user) return;

        const accessToen = localStorage.getItem("token");

        if(!accessToen){
            setLoading(false);

            return;
        }


        const fetchUser = async()=>{
            try{

            }catch(error){
                console.error("User Not authenticated", error);
                clearUser();
            }finally{
                setLoading(false);
            }
        }
        fetchUser();
    },[]);

    const updateUser=(userData)=>{
        setUser(userData);

        localStorage.setItem("token", userData.token);//Save token

        setLoading(false);

    }

    const clearUser=()=>{
        setUser(null);
        localStorage.removeItem("token");
    };


    return(
        <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
  {children}
</UserContext.Provider>


    )
   
}

export default UserProvider;