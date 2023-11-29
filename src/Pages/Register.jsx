import React, { useContext, useState } from "react";
import imgPortada from "./../images/home.avif";
import logo from "./../images/logo2.png";
import "./Register.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import { useNavigate } from "react-router-dom";


import {Input} from "@nextui-org/react";
import Swal from 'sweetalert2'
import { EyeSlashFilledIcon } from "./filesUi/EyeSlashFilledIcon";
import { EyeFilledIcon } from "./filesUi/EyeFilledIcon";

const Register = () => {
  
  const {register } = useAuth()
  const navigate= useNavigate()
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);




  const [dataUser, setDataUser] = useState({
    email: "",
    password: "",
  });
  const handledataUser = (e) => {
    setDataUser({...dataUser,[e.target.name]:e.target.value})
  };
 
  console.log(dataUser)
const handleForm= async(e)=>{

e.preventDefault();
try {

 await register(dataUser.email,dataUser.password)
 navigate("/HomeComponents")


} catch (error) {
  if (error.code === "auth/invalid-email") {
    Swal.fire({
      icon: "error",
      title: "Ups! 😕",
      text: "Ingrese un Gmail o Hotmail valido",
      footer: '<a href="">Cachueleate esta esperando por ti!!</a>',
    });
  }
  if (error.code === "auth/weak-password") {
    Swal.fire({
      icon: "error",
      title: "Ups! 😕",
      text: "Ingrese una contraseña superior a 6 caracteres",
      footer: '<a href="">Es por la seguridad de tu cuenta!</a>',
    });
  }
  if (error.code === "auth/email-already-in-use") {
    Swal.fire({
      title: "<strong>Correo en uso 😟</strong>",
      icon: "info",
      html: "Intenta con otro correo <b>correo o gmail</b> ",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Ok!',
      confirmButtonAriaLabel: "Thumbs up, great!",
    });
  }
  if (error.code === "auth/missing-password") {
    Swal.fire({
      icon: "error",
      title: "Ups! 😕",
      text: "Te olvidas de escribir una contraseña",
      footer: '<a href="">Cosas que pasan, relax!</a>',
    });
  }
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
      id="email"
      onChange={handledataUser}
      name="email"
        
    />
       <Input
      label="Password"
      variant="bordered"
      placeholder="Enter your password"
      id="password"
      onChange={handledataUser}
      name="password"
      value={dataUser.password}
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
            
          
           
            {/*<div className="container-register-formCheckBox">
              <input type="checkbox" name="" />
              <span>
                I agree with Dribbble's Terms of Service, Privacy Policy, and
                default Notification Settings.
              </span>
    </div>*/}
            <div className="container-register-btnLogin">
              <button type="submit" className="createAcount">
              
                Registrarse
              </button>
             
            </div>
          </form>
      
     
   
  );
};

export default Register;
