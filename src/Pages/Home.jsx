import React, { useState } from "react";
import imgPortada from "./../images/fondoPage4.jpg";
import google from "./../images/google2.png";
import logo from "./../images/logo-frist.png";
import "./Home.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import Swal from "sweetalert2";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import Person4Icon from "@mui/icons-material/Person4";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PasswordIcon from '@mui/icons-material/Password';
import bandera  from "../images/bandera.gif"
import mobile from "../images/publicar.png"
import {Input} from "@nextui-org/react";

import { EyeSlashFilledIcon } from "../Pages/filesUi/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../Pages/filesUi/EyeFilledIcon";
import Login from "./Login";
import Register from "./Register";
const Home = () => {
  const { loginWithGoogle,getInformationAvailable } = useAuth();
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(true);
  const {register } = useAuth()

  const [isVisible, setIsVisible] = useState(false);
 const [showRegisterForm, setShowRegisterForm]= useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);




  const [dataUser, setDataUser] = useState({
    email: "",
    password: "",
  });
  const handleLoginWithGoogle = async () => {
    await loginWithGoogle();

    navigate("/HomeComponents");
 
  // Esperar unos segundos para dar tiempo a que se actualice la información
  setTimeout(() => {
    window.location.reload();
  }, 1000); // Puedes ajustar el tiempo de espera según sea necesario

  
  };


  const handleCorreo = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por el momento esta inhabilitado entrar por correo electronico😥",
      footer: '<p href="#">Ingrese con Gmail</p>',
    });
  };
  const handleGitHub=()=>{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por el momento esta inhabilitado entrar por GitHub 😥",
      footer: '<p href="#">Ingrese con Gmail</p>',
    });
  }
  const handleLinkedin=()=>{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por el momento esta inhabilitado entrar por Linkedin 😥",
      footer: '<p href="#">Ingrese con Gmail</p>',
    });
  }
 const handleLogin=()=>{
  setShowRegister(false);
 }
 const handleSignup =()=>{
  setShowRegister(true)
 }

 const handledataUser = (e) => {
  setDataUser({...dataUser,[e.target.name]:e.target.value})
};

const handleShowRegister=()=>{
  setShowRegisterForm(true)
}
const handleHideRegister =()=>{
  setShowRegisterForm(false)
}
  
  return (

    <div className="container-all">
    <div className="bandera">

    </div>

    <div className={`container-home ${showRegister ? "register" : "hide"}`}>
      <div className="container-home-info">
        <div className="info-childs">
          <h2>Bienvenid@ </h2>
          <img src={logo} width={70} alt="logo" />
          <p>Para unirte a nuestra comunidad Cacheleate.com inicia Sesion</p>
          
          <input type="submit" value="Encontrar trabajo" onClick={handleLogin}/>
        </div>
      </div>
      <div className="container-home-information difu">
        <div className="form-information-childs">
        
         
         
          <div className="img-cell">
            <img src={mobile} alt="imagen-mobile"  width={420}/>
          </div>
         
        </div>
      </div>
    </div>



    <div className={`container-home  ${showRegister ? "hide" : "login "}`}>
      <div className="container-home-info">
        <div className="info-childs">
          <h2>Bienvenid@ </h2>
          <img src={logo} width={70} alt="logo" />
          <p>Para unirte a nuestra comunidad Cacheleate.com inicia Sesion</p>
          <input type="submit" value="Volver" onClick={handleSignup}/>
        </div>
      </div>
      <div className="container-home-information screen-white">
        <div className="form-information-childs">
          {!showRegisterForm ? 
           <h2>Crear una cuenta</h2>
            : 
            <h2>Registrate con :</h2>
        }
         
          <div className="icons">
            <i className="bx bxl-google" onClick={handleLoginWithGoogle}>
              <GoogleIcon></GoogleIcon>
            </i>
            <i className="bx bxl-github" onClick={handleGitHub}>
              <GitHubIcon></GitHubIcon>
            </i>
            <i className="bx bxl-linkedin" onClick={handleLinkedin}>
              <LinkedInIcon></LinkedInIcon>
            </i>
          </div>
          {!showRegisterForm ? 
            <p>o usa tu cuenta para entrar</p> :
            <p>o registrate con correo electronico</p>
          }
        

          <div className="container-register-form">
          <div className="container-register-logo">
       
          </div>
          <div>

         {!showRegisterForm ? 
         <>
          <Login></Login>
          <div onClick={handleShowRegister}> 
                ¿No tienes una cuenta?
              <a className="sign">
              Registrarse
                </a>
                
              </div>
         </> :  
         <>
         
         <Register></Register>   
          <div onClick={handleHideRegister}>
                ¿ya tienes una cuenta?
                <a to="/" className="sign">
                  Ingresar
                </a>
              </div> 
         </> }
        


          
          </div> 
        </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
