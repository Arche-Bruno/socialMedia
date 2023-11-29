import { createContext, useContext, useReducer } from "react";


export const contextRateUser= createContext();

export const useContextRateUser = ()=>{
        
    const contextRateUserUse = useContext(contextRateUser);
      if(!contextRateUserUse) throw new Error("contexto rate use is undefined ")
      return contextRateUserUse;

};

export const RateProvider = ({children})=>{

   const initialState=[];

   const rateUserState= (state=initialState,action={})=>{
       switch(action.type){
            case "[rateUser]_add":
                 return[...state,action.payload];
            case "[rateUser]_remove":
                 return state.filter((itm)=> itm.idRateUser!== action.payload);
            
            default:
                state;
       }
      
   }

   
 

   const addRateUser = (received) =>{
    console.log(received)
     const action={
        type:"[rateUser]_add",
        payload: received,
     };
     dispatch(action);
   }
   const deleteRateUser =(id)=>{

    const action={
        type:"[rateUser]_remove",
        payload:id,
      
    }
     dispatch(action)
     
   }
  
    const [state,dispatch]= useReducer(rateUserState, initialState);
 
 
    return(
        <contextRateUser.Provider value={{state, addRateUser,deleteRateUser,initialState}}>
            {children}
        </contextRateUser.Provider>
    )
       
}
