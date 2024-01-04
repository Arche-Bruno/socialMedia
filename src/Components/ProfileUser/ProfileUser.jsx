import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { dbRealTime } from "../../Firebase";
import { onValue, push, set, ref, get, update } from "firebase/database";
import "./ProfileUser.css";
import { Link } from "react-router-dom";

import { Tabs, Tab } from "@nextui-org/react";

import textLogo from "../../images/TextLogo.png";
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { useAuth } from "../../Context/authContext";
import { useContextPublication } from "../../Context/contextPublication";

import logo from "./../../images/newLogo.png";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { GalleryIcon } from "./IconsProfile/GalleryIcon";
import { MusicIcon } from "./IconsProfile/MusicIcon";
import { VideoIcon } from "./IconsProfile/VideoIcon";
import ProfileUserFotos from "../ProfileUserFotos/ProfileUserFotos";

import ProfileUserPublicaciones from "../ProfileUserPublicaciones/ProfileUserPublicaciones";

import Rating from "@mui/material/Rating";

import Stack from "@mui/material/Stack";

import Fingerprint from "@mui/icons-material/Fingerprint";
import ProfileUserComentarios from "../ProfileUserComentarios/ProfileUserComentarios";

const pages = ["", "", ""];

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import PublicIcon from "@mui/icons-material/Public";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ForumIcon from "@mui/icons-material/Forum";
import VerifiedIcon from "@mui/icons-material/Verified";
import ImageIcon from "@mui/icons-material/Image";

import imgLogo from "./../../images/logoImage3.png";
import commentLogo from "./../../images/logoComentarios3.png";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";

import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Swal from "sweetalert2";

const ProfileUser = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para controlar si se está 
  const [cantPublication, setCantPublication] = useState(0)
  const [contComments, setContComments] = useState(0);
  alert;
  const {
    userActive,
    nameState,
    imgProfile,
    handlePublication,
    setUserOnlineStatus,
    signOutAccount,
    addPublicationToUser,
  } = useAuth();
  const {
    getInformationAvailable,
    getLikesCountForUser,
    getHeartAllUserData,
    cantPublications,
    setCommentFocused,
  } = useContextPublication();
 

  const handleOpinarUsuario = () => {
    setCommentFocused(true);
  };
  /*lOGICA PARA EL ICONO DE PERFIL*/
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**/
  const [previousUserId, setPreviousUserId] = useState(userId);

  useEffect(() => {
    if (userId && userId !== previousUserId) {
      window.location.reload(); // Recarga la página si el ID del usuario ha cambiado
    }
    setPreviousUserId(userId);
  }, [userId, previousUserId]);

  useEffect(() => {
    const getUserData = async () => {
      const userRef = ref(dbRealTime, `users/${userId}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
   
        setUserData(data);
      } else {
        console.log("No se encontraron datos para este usuario");
      }
      setLoading(false);
    };

    getUserData();
  }, [userId,cantPublications]);

  /* Función para obtener el número total de likes e corazones*/

  const [dataHeart, setDataHeart] = useState([]);
  const [likesCount, setLikesCount] = useState({ totalLikes: 0, likedBy: [] });

  useEffect(() => {
    getInformationAvailable();

    const fetchLikesCount = async () => {
      const idUser = userId;

      const { totalLikes, likedBy } = await getLikesCountForUser(idUser);
      const data = await getHeartAllUserData(idUser);
      setDataHeart(data);
      setLikesCount({ totalLikes, likedBy });
    };
    fetchLikesCount();
    const interval = setInterval(async () => {
      fetchLikesCount();
    }, 1000); // Llama a fetchLikesCount cada 2 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, [userId]);
  /**/

  const likes = likesCount.likedBy.map((itm) => itm.interactionType === "👍");

  const likeCount = likes.reduce((count, current) => {
    return current ? count + 1 : count;
  }, 0);

  const heartCount = likes.reduce((count, current) => {
    return current ? count : count + 1;
  }, 0);

  // Función para obtener el número total de publicaciones del usuario

  useEffect(() => {
    getInformationAvailable();
    

  }, [userId]);

  /**/

  const handleOpenCreate = () => {
    if (nameState === userActive.displayName) {
      alert("No puede publicar si aún no edita su perfil");
      return; // Sale temprano de la función si se cumple la condición
    }
    handlePublication(true);
  };

  const handleSignOut = async () => {
    try {
      // Primero, establece el estado en línea del usuario en "false"
      if (userActive) {
        await setUserOnlineStatus(userActive.uid, false);
      }

      // Luego, cierra la sesión del usuario
      await signOutAccount();
    } catch (error) {
      console.log(error);
    }
  };

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  /* To render the components*/
  const [selectedTab, setSelectedTab] = useState("fotos");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const renderTabContent = () => {
    if (selectedTab === "fotos") {
      return (
        <div className="profileUser-fotos">
          <div className="imgLogo-content">
            <div className="imgLogo">
              <img src={imgLogo} alt="imagen logo" />
            </div>

            <ProfileUserFotos id={userId}  name={userData?.name}/>
          </div>
        </div>
      );
    } else if (selectedTab === "publicaciones") {
      return (
        <div className="profileUser-publicaciones">
          <ProfileUserPublicaciones id={userId} />
        </div>
      );
    } else if (selectedTab === "comentarios") {
      return (
        <div className="profileUser-comentarios">
          <div className="imgLogo-content">
            <div className="imgLogo">
              <img src={commentLogo} alt="imagen logo" />
            </div>

            <ProfileUserComentarios id={userId} name={userData?.name} />
          </div>
        </div>
      );
    }
  };
  /**/
  /*Para contactar usuario */
  const handleContact = async() => {
    const result = await Swal.fire({
      title: "¿Estás segur@?",
      html: `Obtendrás los datos de contacto de <strong>${userData?.name}</strong>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, contactar",
      allowOutsideClick: false, // Para evitar que el cuadro de diálogo se cierre haciendo clic fuera de él
      cancelButtonText: "Cancelar", // Cambia el texto del botón Cancelar
    });
   
    if (result.isConfirmed) {
      let redirectUrl;
      if (/^\d{9}$/.test(userData?.numberPhone)) {
        const message = encodeURIComponent(`Hola, ${userData?.name}, te contacto desde la pagina Cachueleate.com mi nombre es : `);
        redirectUrl = `https://api.whatsapp.com/send?phone=51${userData?.numberPhone}&text=${message}`;

       
      } else if (userData?.numberPhone.includes("@")) {
        redirectUrl = `mailto:${userData?.numberPhone}`;
      } else if (userData?.numberPhone.startsWith("http")) {
        redirectUrl = userData?.numberPhone;
      }
      window.open(redirectUrl, "_blank");
    }
  };
  
  /**/
  /**/

  return (
    <div className="container-ProfileUser">
      <AppBar position="fixed" sx={{ bgcolor: "#1E1E1E" }}>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            
            <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to="/HomeComponents" className="profileUser-logo-text">
              <div className="container-button-img">
                <img src={logo} alt="Logo-cachueleate" className="imgLogo" />
              </div>
              </Link>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{ display: { xs: "flex", md: "none" } }}
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              ></Menu>
            </Box>

            <Link to="/HomeComponents" className="profileUser-logo-text">
              <div>
                <img
                  src={textLogo}
                  className="textLogo textLogoProfileUser"
                  alt="LogoText-cachueleate"
                />
              </div>
            </Link>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                marginLeft: "15rem",
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ display: { xs: "flex", md: "flex" } }} placement="bottom-end">
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    isBordered
                    className="transition-transform"
                    color="primary"
                    name={userActive.email || nameState}
                    scale={1.5}
                    src={imgProfile}
                  />
                </IconButton>
              </Tooltip>
            </Box>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem >    
                <Avatar  /> 
                <Link to={`/ProfileUser/${userActive.uid}`}>
                Mi perfil
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Avatar /> {userActive.email || nameState}
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Sobre Cachueleate
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Confirguración
              </MenuItem>
              <MenuItem onClick={handleSignOut} key="logout" color="danger">
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Cerrar Sesión
              </MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>

      {userData ? (
        <div className="container-profileUserData">
          <div className="profileUserData-imgs">
            <div className="profileUserData-imgFrontPage">
              <img src={userData.frontPage} alt="img pordata User" />
            </div>
          </div>
          <div className="profileData-imgProfile-data">
            <div className="profileUserData-imgProfile">
              <div className="profileUserData-data">
                <div className="data-name-email">
                  <span className="data-name">
       
                    <VerifiedIcon fontSize="large" /> {userData.name}
                  </span>
                  <span className="data-email">{userData.email} </span>
                </div>

                <div className="data-cantidad">
                  <div className="data">
                    <p>{cantPublications} </p>
                    <span> Publicaciones</span>
                  </div>
                  <div className="data">
                    <p> {likesCount.totalLikes} </p>
                    <span>Likes</span>
                  </div>
                  <div className="data">
                    <p>
              
                      {userData.contComments
                        ? userData.contComments.length
                        : "0"}{" "}
                    </p>
                    <span>Comentarios</span>
                  </div>
                </div>

                <div className="data-btns">
                  {userId !== userActive.uid ? 
                    <Stack spacing={2} direction="row" className="data-btns">
                    <Button variant="contained" onClick={handleOpinarUsuario}>
                      <ForumIcon></ForumIcon>

                      <span className="opinar">Opinar usuario</span>
                    </Button>
                    <Button variant="contained" onClick={handleContact}>
                      <PeopleAltIcon></PeopleAltIcon>

                      <span className="contactar">Contactar</span>
                    </Button>
                  </Stack>
                  : 
                  <>
                  </>
                }
                
                </div>
              </div>
            </div>
            <Stack spacing={1} className="data-starts">
              <Rating
                name="half-rating-read"
                defaultValue={userData.starts}
                precision={0.5}
                readOnly
                className="profileUser-starts"
              />
              <div className="data-starts-work">
                <p>{userData.contWorkUser} </p>

                <span> Trabajos realizados </span>
              </div>
            </Stack>

            <div
              className={`profile-img ${
                userData.online === true
                  ? "borderProfile-img"
                  : "borderProfile-imgNo"
              }`}
            >
              <img src={userData.profileImg} alt="img perfil User" />
            </div>
          </div>

          <div className="profileUser-buttons-mobile">
            <div className="profileUser-fotos-mobile">
              <div className="imgLogo-content">
                <div className="imgLogo">
                  <img src={imgLogo} alt="imagen logo" />
                </div>

                <ProfileUserFotos id={userId}  name={userData?.name}/>
              </div>
            </div>

            <div className="profileUser-publicaciones-mobile">
              <ProfileUserPublicaciones id={userId} />
            </div>

            <div className="profileUser-comentarios-mobile">
              <div className="imgLogo-content">
                <div className="imgLogo">
                  <img src={commentLogo} alt="imagen logo" />
                </div>

                <ProfileUserComentarios id={userId} name={userData?.name} />
              </div>
            </div>
          </div>

          <div>
            <div className="flex w-full justify-center profileUser-buttons-container">
              <div className="profileUser-buttons">
                <div
                  className={`tab ${
                    selectedTab === "fotos" ? "active" : ""
                  } no-right-border`}
                  onClick={() => handleTabChange("fotos")}
                >
                  <span className="icon">
                    {" "}
                    <ImageIcon></ImageIcon>{" "}
                  </span>
                  <span>Fotos</span>
                </div>
                <div
                  className={`tab ${
                    selectedTab === "comentarios" ? "active" : ""
                  } no-border`}
                  onClick={() => handleTabChange("comentarios")}
                >
                  <span className="icon">
                    <ChatBubbleOutlineIcon />
                  </span>
                  <span>Comentarios</span>
                </div>
                <div
                  className={`tab ${
                    selectedTab === "publicaciones" ? "active" : ""
                  } no-left-border`}
                  onClick={() => handleTabChange("publicaciones")}
                >
                  <span className="icon">
                    {" "}
                    <PublicIcon></PublicIcon>{" "}
                  </span>
                  <span>Publicaciones</span>
                </div>
              </div>
            </div>
            {renderTabContent()}
          </div>
        </div>
      ) : (
        <p>Cargando datos del usuario...</p>
      )}
    </div>
  );
};

export default ProfileUser;
