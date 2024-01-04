import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../Context/authContext";

import logo from "./../../images/newLogo.png";

import "./HomeComponents.css";

import FilterJob from "../FilterJob/FilterJob";
import Profile from "../Profile/Profile";
import CreatePost from "../CreatePost/CreatePost";

import CardPublication from "../CardPublication/CardPublication";
import { useContextPublication } from "../../Context/contextPublication";

import CardRateUser from "../CardRateUser/CardRateUser";

import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import FavoriteIcon from "@mui/icons-material/Favorite";

import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";

import notifi from "./../../images/notificacionn.png";
import guardado from "./../../images/guardado.png"
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Badge from "@mui/material/Badge";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import textLogo from "../../images/TextLogo.png";

/*Para cerrar sesion*/

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Swal from "sweetalert2";
import "animate.css";
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import CardPublicationLoading from "../CardPublication/CardPublicationLoading";

/**/ //Hover del listItms
const listItemHover = {
  "&:hover": {
    backgroundColor: "#f5f5f5",
    cursor: "pointer",
  },
};
/**/
const HomeComponents = () => {
  const {
    userActive,
    nameState,
    imgProfile,
    frontPage,
    loading,
    isUserOnline,
    ChangeProfile,
  } = useAuth();

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [notifications, setNotifications] = useState(0); // Estado para el contador de notificaciones
  const [scrolled, setScrolled] = useState(false);
  const [newArray, setNewArray] = useState([]);
  const containerRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 445) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    // Realiza aquí la lógica de carga de datos necesaria
    // ...

    // Simula una carga de 2 segundos (ajusta según necesites)
    setTimeout(() => {
      setIsLoading(false); // Marca que la carga ha terminado
    }, 1500);
  }, []); // Asegúrate de ajustar las dependencias según tus necesidades
  const containerClass = `container-home-RateUser ${
    scrolled ? "container-home-RateUser-fixed" : ""
  }`;

  // Función para obtener el número total de likes del usuario
 
  const {
    getInformationAvailable,
    postsAvailable,
    getLikesCountForUser,
    getHeartAllUserData,
    postsAvailableCategory,
    postsAvailablePlace,
  } = useContextPublication();
  const {
    getArrUserPublication,
    handlePublication,
    setUserOnlineStatus,
    signOutAccount,
  } = useAuth();

  useEffect(() => {
    // Lógica para procesar las publicaciones cuando cambia postsAvailable, postsAvailableCategory, o postsAvailablePlace
    let index = 0;
    let tempArray = [];

    for (const key in postsAvailable) {
      const obj = postsAvailable[key];
      for (const innerKey in obj) {
        const newObj = {};
        newObj[innerKey] = obj[innerKey];
        tempArray[index] = newObj;
        index++;
      }
    }

    tempArray.sort((a, b) => {
      const timeA = Object.values(a)[0].createdTime;
      const timeB = Object.values(b)[0].createdTime;
      return timeA - timeB;
    });

    // Filtrar por categoría solo si postsAvailableCategory tiene un valor
    if (postsAvailableCategory && postsAvailableCategory !== "Todos los trabajos") {
      tempArray = tempArray.filter((item) => {
        const category = Object.values(item)[0].category.toLowerCase();
        return category === postsAvailableCategory.toLowerCase();
      });
    }

    // Filtrar por lugar solo si postsAvailablePlace tiene un valor
    if (postsAvailablePlace && postsAvailablePlace !== "Todo Lima") {
      tempArray = tempArray.filter((item) => {
        const place = Object.values(item)[0].place.toLowerCase();
        return place === postsAvailablePlace.toLowerCase();
      });
    }

    // Invertir el arreglo ordenado para que el último elemento sea el primero y viceversa
    tempArray.reverse();

    setNewArray(tempArray);

    console.log(tempArray);

    console.log("desde el homeComponets: " + postsAvailableCategory);

  }, [postsAvailable, postsAvailableCategory, postsAvailablePlace]);

  const [likesCount, setLikesCount] = useState({ totalLikes: 0, likedBy: [] });

  const [showLikes, setShowLikes] = useState(false); // Estado para controlar si se muestran los likes
  const [showHearts, setShowHearts] = useState(false);
  const notificationRef = useRef();
  const notificationRefHeart = useRef();

  /*lOGICA PARA EL ICONO DE PERFIL*/
  const [anchorEll, setAnchorEll] = useState(null);
  const openn = Boolean(anchorEll);
  const handleClickk = (event) => {
    setAnchorEll(event.currentTarget);
  };
  const handleClosee = () => {
    setAnchorEll(null);
  };

  /**/

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (notificationRef.current &&
          !notificationRef.current.contains(event.target)) ||
        (notificationRefHeart.current &&
          !notificationRefHeart.current.contains(event.target))
      ) {
        setShowLikes(false);
        setShowHearts(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationRef]);

  const [dataHeart, setDataHeart] = useState([]);

  useEffect(() => {
    getInformationAvailable()
    const userId = userActive.uid; // Reemplaza esto con el ID de usuario adecuado
    const fetchLikesCount = async () => {
      const { totalLikes, likedBy } = await getLikesCountForUser(userId);
      const data = await getHeartAllUserData(userId);
      setDataHeart(data);
      setLikesCount({ totalLikes, likedBy });
    };
    fetchLikesCount();
    const interval = setInterval(async () => {
      fetchLikesCount();
    }, 0); // Llama a fetchLikesCount cada 2 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  const handleOpenCreate = () => {
    if (nameState === userActive.displayName) {
      Swal.fire({
        title: "No puede publicar si aún no edita su perfil",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });

      return; // Sale temprano de la función si se cumple la condición
    }
    handlePublication(true);
  };
  const handleOpenProfile = () => {
    ChangeProfile(true);
  };

  const handleSignOut = async () => {
    try {
      if (userActive) {
        await setUserOnlineStatus(userActive.uid, false);
        await signOutAccount();
        // Otro código necesario después del cierre de sesión
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Manejo de errores adicional si es necesario
    }
  };

  const scrollToPublication = (idPublication) => {
    const publicationElement = document.getElementById(
      `publication_${idPublication}`
    );
    if (publicationElement) {
      publicationElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClickNotification = () => {
    setNotifications(0);
    setLikesCount({ ...likesCount, totalLikes: 0 });
  };

  /*Icono para cerrar sesion*/

 
 
  return (
    <>
    {isLoading ? 
      <LoadingScreen></LoadingScreen>
     : 
    <div className="container-HomeComponents">
     
      <nav className="container-navBar">
        <div className="container-svgs-btns">
          <button className="container-button">
            <div
              className="container-button-img"
              onClick={() => window.location.reload()}
            >
              <img src={logo} alt="Logo cachueleate" className="imgLogo" />
            </div>
            <div className="LogoText-cachueleate" onClick={() => window.location.reload()}>
              <img
                src={textLogo}
                className="textLogo"
                alt="LogoText-cachueleate"
              />
            </div>
          </button>
          <ThemeProvider theme={theme} >
            <Box sx={{ width: "100%" }}>
              <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                sx={{
                  bgcolor: "#1E1E1E",
                  display: "flex",
                  "@media (max-width: 350px)": {
                    justifyContent: "space-between",
                    "& .MuiBottomNavigationAction-root": {
                      flexBasis: "10%",
                      margin: "0 -20px", 
                      "& .MuiSvgIcon-root": {
                        fontSize: "14px", 
                      },
                    },
                  },
                }}
              >
                <BottomNavigationAction
                  label="Home"
                  icon={<HomeIcon />}
                  onClick={() => window.location.reload()}
                />
                <BottomNavigationAction
                  label="Favoritos"
                  icon={
                    <Badge badgeContent={dataHeart.length || 0} color="error">
                      <FavoriteIcon />
                    </Badge>
                  }
                  onClick={() => {
                    setShowHearts(true);
                  }}
                />
                <BottomNavigationAction
                  label={`Notificaciones`}
                  icon={
                    <Badge badgeContent={likesCount.totalLikes} color="error">
                      <NotificationsIcon />
                    </Badge>
                  }
                  onClick={() => {
                    setShowLikes(true);
                    handleClickNotification();
                  }}
                />
                
              </BottomNavigation>
            </Box>

            <Box
              sx={{ display: { xs: "flex", md: "flex" } }}
              placement="bottom-end"
             
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClickk}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={openn ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openn ? "true" : undefined}
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
              anchorEl={anchorEll}
              id="account-menu"
              open={openn}
              onClose={handleClosee}
              onClick={handleClosee}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Link to={`/ProfileUser/${userActive.uid}`}>
                <MenuItem style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    className="transition-transform"
                    color="primary"
                    name={userActive.email || nameState}
                    scale={1.5}
                    src={imgProfile}
                    style={{ marginRight: "10px" }} 
                  />
                  Mi perfil
                </MenuItem>
              </Link>
              <MenuItem
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                onClick={handleClosee}
              >
                <Avatar style={{ marginRight: "10px" }} />{" "}
                <span>{userActive.email || nameState}</span>
              </MenuItem>
              <Divider />
              <MenuItem key="analytics" onClick={handleOpenCreate}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Crear Publicación
              </MenuItem>
              <MenuItem onClick={handleOpenProfile} key="help_and_feedback">
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Editar Perfil
              </MenuItem>
              <MenuItem onClick={handleSignOut} key="logout" color="danger">
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Cerrar Sesión
              </MenuItem>
            </Menu>
          </ThemeProvider>
        </div>
        {showHearts && (
          <div className="container-usersLike" ref={notificationRefHeart}>
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              style={{ letterSpacing: "-1px" }}
            >
            <img src={guardado} alt="imagen de guardado" />
            </Typography>
            <div className="usersLike">
              {dataHeart.length > 0 ? (
                <ul>
                  {dataHeart.map((user, index) => (
                    <div key={index}>
                      <ListItem sx={listItemHover}>
                        <ListItemAvatar>
                          <Avatar src={user.imgCreator} alt="img User" />
                        </ListItemAvatar>
                        <ListItemText
                          primary={user.nameCreator}
                          secondary={
                            user.textCreator.length > 32
                              ? ` ${user.textCreator.substring(0, 32)}...`
                              : user.textCreator
                          }
                          onClick={() => {
                            scrollToPublication(user.publicationIdCreator);
                          }}
                          style={{ cursor: "pointer" }}
                        />
                      </ListItem>
                      {index < dataHeart.length - 1 && (
                        <Divider variant="inset" component="li" />
                      )}
                    </div>
                  ))}
                </ul>
              ) : (
                <p>Sin guardados</p>
              )}
            </div>
          </div>
        )}

        {showLikes && (
          <div className="container-usersLike" ref={notificationRef}>
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              style={{ letterSpacing: "-1px" }}
            >
              <img src={notifi} alt="imagen de notificación" />
            </Typography>
            <div className="usersLike">
              <ul>
                {likesCount.likedBy.map((user, index) => (
                  <div key={index}>
                    <ListItem sx={listItemHover}>
                      <ListItemAvatar>
                        <Avatar src={user.imgUser} alt="img User" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={user.nameUser}
                        secondary={`Le dio ${user.interactionType} a : ${
                          user.textPost.length > 32
                            ? `${user.textPost.substring(0, 32)}...`
                            : user.textPost
                        }`}
                        onClick={() => {
                          scrollToPublication(user.idPublication);
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </ListItem>
                    {index < likesCount.likedBy.length - 1 && (
                      <Divider variant="inset" component="li" />
                    )}
                  </div>
                ))}
              </ul>
            </div>
          </div>
        )}
      </nav>
      <hr />

      <div className="containers-components">
        <div className="container-home-FilterJob">
          <FilterJob></FilterJob>
        </div>

        <div className="container-home-3components">
          <div className="createPost">
            <CreatePost></CreatePost>
          </div>

          <div className="container-home-profileMovil">
            <Profile></Profile>
          </div>
          <div className="container-home-RateUserMovil">
            {getArrUserPublication !== null ? (
              getArrUserPublication.map((itm, index) => (
                <div key={itm.id}>
                  <CardRateUser
                    name={itm.name}
                    start={itm.start}
                    online={itm.online}
                    imgProfile={itm.img}
                    id={itm.id}
                    hourUser={itm.hour}
                  ></CardRateUser>
                </div>
              ))
            ) : (
              <>
               
              </>
            )}
          </div>
       {newArray.length <= 0 ? 
       
       <div>
         <CardPublicationLoading></CardPublicationLoading>
     </div>
        :
        newArray.map((item, index) => {
          const data = Object.values(item)[0];
          return (
            <div key={index} className="container-home-publications">
              <div className="publication">
                <CardPublication
                  idPublication={data.idPubli}
                  id={data.id}
                  img={data.img}
                  imgFront={data.imgFront}
                  name={data.name}
                  text={data.textPost}
                  price1={data.rango1}
                  price2={data.rango2}
                  skills={data.skills}
                  number={data.numberPhone}
                  img1={data.img1} 
                  img2={data.img2} 
                  start={data.starts}
                  online={data.isOnline}
                  time={data.createdTime}
                  like={data.likes}
                  placeUser={data.place}
                />
              </div>
            </div>
          );
        })
      }
      

        
        </div>
        <div className="container-profilePc-RateUser" ref={containerRef}>
          <div className="container-home-profilePc">
            <Profile></Profile>
          </div>
          <div className={containerClass}>
            {getArrUserPublication ? (
              <div className="torneo-container">
                <div className="parpadeo-text-span">
                  <div className="parpadeo-texto">Califica a un usuario</div>
                  <span className="parpadeo-span">
                    {" "}
                    Cantidad : {getArrUserPublication.length || 0}
                  </span>
                </div>
              </div>
            ) : (
              <div className="torneo-container">
                <div className="parpadeo-text-span">
                  <div className="parpadeo-texto">Contacta a un usuario</div>
                  <span> Cantidad : {0}</span>
                </div>
              </div>
            )}

            {getArrUserPublication !== null ? (
              getArrUserPublication.map((itm, index) => (
                <div key={itm.id}>
                  <CardRateUser
                    name={itm.name}
                    start={itm.start}
                    online={itm.online}
                    imgProfile={itm.img}
                    id={itm.id}
                    hourUser={itm.hour}
                  ></CardRateUser>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    
      </div>
      }
      </>
  );
};

export default HomeComponents;
