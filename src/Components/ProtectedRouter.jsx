import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import LoadingScreen from "./LoadingScreen/LoadingScreen";

 export function ProtectedRouter({children}){

    const {userActive,loading}=useAuth()
    
   if(loading) {
    return <LoadingScreen></LoadingScreen>
   }

    if(!userActive) {
        return <Navigate to='/'></Navigate>
    }
  

    return <>{children}</>
 }