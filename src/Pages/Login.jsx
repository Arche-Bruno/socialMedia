import React, {  useState } from "react";
import { useAuth } from "../Context/authContext";
import imgPortada from "./../images/home.avif";
import logo from "./../images/logo2.png";
import google from "./../images/google2.png";
import { NavLink,useNavigate } from "react-router-dom";

import Swal from 'sweetalert2'
import "./Login.css";
import { Input } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "./filesUi/EyeSlashFilledIcon";
import { EyeFilledIcon } from "./filesUi/EyeFilledIcon";

const Login = () => {

  
    const {signUp,resetPasswordAndEmail} = useAuth()
    const navigate = useNavigate();


 
    const [dataUser, setDataUser] = useState(
      {
        email:'',
        password:''
      }
    )
     const [isVisible,setIsVisible]= useState(false);
const toggleVisibility=()=>{
  setIsVisible(!isVisible)
}

   
   const handleSignUp=(e)=>{
       setDataUser({...dataUser,[e.target.name]:e.target.value})
   }
   const handleForm =async (e)=>{
   e.preventDefault();

   try {

   await signUp(dataUser.email,dataUser.password)

   navigate("/HomeComponents");

   
   
   } catch (error) {
     console.log(error.code)

     if(error.code ==="auth/invalid-login-credentials"){
      
     
        Swal.fire({
          icon: 'error',
          title: 'Ups! 😕',
          text: 'El email o contraseña incorrecta incorrecta',
          footer: '<a href=""></a>'
        })
     }
     if(error.code ==="auth/invalid-email"){
      
     
      Swal.fire({
        icon: 'error',
        title: 'Ups! 😕',
        text: 'Por favor ingrese un gmail',
        footer: '<a href=""></a>'
      })
   }
   }

   }
   
  
  
   const handleResetPassword= async()=>{
    if(!dataUser.email) return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ingrese un correo valido ahí se le enviara un enlace para que recupere su cuenta',
      footer: '<a href="">Ingresa un email</a>'
    })
    try {
      Swal.fire({
        title: `Se envio un enlace de recuperación a <b> ${dataUser.email} </b>revise la sección <b>correo no deseado</b> si no lo encuentra`,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      await resetPasswordAndEmail(dataUser.email)

     
    } catch (error) {
      console.log(error.message)
    }
   
   }

  return (
  
     
       
          <form onSubmit={handleForm}>
          <div className="container-register-form-input">
          <Input
      isClearable
      type="email"
      label="Email"
      variant="bordered"
      placeholder="ingresa tu email"
      defaultValue="junior9039@hotmail.com"
      onClear={() => console.log("input cleared")}
      className="max-w-xs input"
      onChange={handleSignUp}
      name="email"   
      id="email"
        
    />
       <Input
      label="Password"
      variant="bordered"
      placeholder="Ingrese su contraseña"
      id="password"
      onChange={handleSignUp}
      name="password"
    
      endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      className="max-w-xs input"
    />
          </div>
            
           
            <div className="container-login-btnLogin">
              <button type="submit" className="createAcount">
                Ingresar
              </button>
              <p>
                ¿Olvidaste tu contraseña?{" "}
                <a  className="sign-resetPassword" onClick={handleResetPassword}>
                  Recuperar contraseña
                </a>
              </p>
          
            </div>
          </form>
    
   
  
  );
};

export default Login;
