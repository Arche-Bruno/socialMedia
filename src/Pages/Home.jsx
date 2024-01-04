import React, { useEffect, useState } from "react";
import imgPortada from "./../images/fondoPage4.jpg";
import google from "./../images/google2.png";
import logo from "./../images/logo-frist.png";
import logo2 from "./../images/newLogo.png";
import "./Home.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import Swal from "sweetalert2";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import bandera from "../images/bandera2.gif";
import mobile from "../images/publicar.png";

import user from "../images/userPrincipal3.svg";
import empresa from "../images/empresaPrincipal.svg";
import work from "../images/work.svg";

import Login from "./Login";
import Register from "./Register";
import Count from "./count";

import videoMobil from "./../images/videoMobil2.mp4"
import videoPc from "./../images/video2.mp4"
const Home = () => {
  const { loginWithGoogle } = useAuth();

  const [countUser, setCountUser] = useState(0);
  const [countCompany, setCountCompany] = useState(0);
  const [countWorks, setCountWorks] = useState(0);
  const limiteUsuarios = 856;
  const limitCompanies = 23;
  const limitworks = 15;

  useEffect(() => {
    const userInterval = setInterval(() => {
      setCountUser((prevUsuarios) => {
        const nuevoValor = prevUsuarios + 10; // Ajusta la velocidad de incremento
        return nuevoValor >= limiteUsuarios ? limiteUsuarios : nuevoValor;
      });
    }, 50); // Ajusta el intervalo de tiempo (en milisegundos)

    const companyInterval = setInterval(() => {
      setCountCompany((prevCount) => {
        const newCount = prevCount + 4; // Ajusta la velocidad de incremento para empresas
        return newCount >= limitCompanies ? limitCompanies : newCount;
      });
    }, 400); // Ajusta el intervalo de tiempo (en milisegundos)
    const workInterval = setInterval(() => {
      setCountWorks((prevCount) => {
        const newCount = prevCount + 4; // Ajusta la velocidad de incremento para empresas
        return newCount >= limitworks ? limitworks : newCount;
      });
    }, 400); // Ajusta el intervalo de tiempo (en milisegundos)
    // Limpia los intervalos cuando el componente se desmonta
    return () => {
      clearInterval(userInterval);
      clearInterval(companyInterval);
      clearInterval(workInterval);
    };
  }, []);
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(true);

  const [isVisible, setIsVisible] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
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
  const handleGitHub = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por el momento esta inhabilitado entrar por GitHub 😥",
      footer: '<p href="#">Ingrese con Gmail</p>',
    });
  };
  const handleLinkedin = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por el momento esta inhabilitado entrar por Linkedin 😥",
      footer: '<p href="#">Ingrese con Gmail</p>',
    });
  };
  const handleLogin = () => {
    setShowRegister(false);
  };
  const handleSignup = () => {
    setShowRegister(true);
  };

  const handledataUser = (e) => {
    setDataUser({ ...dataUser, [e.target.name]: e.target.value });
  };

  const handleShowRegister = () => {
    setShowRegisterForm(true);
  };
  const handleHideRegister = () => {
    setShowRegisterForm(false);
  };

  return (
    <div className="container-all">
      <div className={`container-home ${showRegister ? "register" : "hide"}`}>
        <div className="container-home-info">
          <div className="info-childs">
            <div className="home-title-imgBandera">
              <h2>Bienvenid@</h2>
              <div className="home-imgBandera">
                <img
                  src={bandera}
                  className="img-bandera"
                  alt="iamgen bandera"
                />
              </div>
              

            </div>
    
            <div className="container-svgsUserCompany">
              <div className="home-user home-stats">
                <div className="icon-container">
                  <img className="home-icon" src={user} alt="icon user" />
                </div>
                <span className="count">{countUser}</span>
                <span>Usuarios registrados</span>
              </div>
              <div className="home-company home-stats">
                <div className="icon-container">
                  <img className="home-icon" src={empresa} alt="icon company" />
                </div>
                <span className="count">{countCompany}</span>
                <span>empresas registradas</span>
              </div>
              <div className="home-work home-stats">
                <div className="icon-container">
                  <img className="home-icon" src={work} alt="icon work" />
                </div>
                <span className="count">{countWorks}</span>
                <span>trabajos disponibles</span>
              </div>
            </div>

            <input
              type="submit"
              value="Encontrar trabajo"
              onClick={handleLogin}
            />
          </div>
        </div>
        <div className="container-home-information difu">
          <div className="form-information-childs">
            <div className="img-cell">
              {/* <img src={mobile} alt="imagen-mobile" /> */}
              <video autoPlay loop muted>
            <source src={videoMobil} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="logoVideo">
          <img src={logo2}  alt="logo" />
          </div>
          
            </div>
            <div className="pc">
              {/* <img src={mobile} alt="imagen-mobile" /> */}
              <video autoPlay loop muted>
            <source src={videoPc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="logoVideo">
          <img src={logo2}  alt="logo" />
          </div>
          
            </div>
          </div>
        </div>
      </div>

      <div className={`container-home  ${showRegister ? "hide" : "login "}`}>
        <div className="container-home-info">
          <div className="info-childs">
            <div className="home-title-imgBandera">
              <h2>Cachueleate </h2>
              <div className="home-imgBandera">
                <img
                  src={bandera}
                  className="img-bandera"
                  alt="iamgen bandera"
                />
              </div>
            </div>

            <img src={logo} width={70} className="logo-cell" alt="logo" />
            <p>Para unirte a nuestra comunidad Cacheleate.com inicia Sesion</p>
            <input type="submit" value="Volver" onClick={handleSignup} />
          </div>
        </div>
        <div className="container-home-information screen-white">
          <div className="form-information-childs">
            {!showRegisterForm ? (
              <h2>Crear una cuenta</h2>
            ) : (
              <h2>Registrate con :</h2>
            )}

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
            {!showRegisterForm ? (
              <p>o usa tu cuenta para entrar</p>
            ) : (
              <p>o registrate con correo electronico</p>
            )}

            <div className="container-register-form">
              <div className="container-register-logo"></div>
              <div>
                {!showRegisterForm ? (
                  <>
                    <Login></Login>
                    <div  onClick={handleShowRegister}>
                      ¿No tienes una cuenta?
                      <a className="sign">Registrarse</a>
                    </div>
                  </>
                ) : (
                  <>
                    <Register></Register>
                    <div onClick={handleHideRegister}>
                      ¿ya tienes una cuenta?
                      <a to="/" className="sign">
                       <strong>Ingresar</strong> 
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
