import React, { useEffect, useState } from "react";

import { onValue, push, set, ref, get } from "firebase/database";
import { useAuth } from "../../Context/authContext";

import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";

import Like from "../ICONS/Like";

import "./CardPublication.css";

import { Button } from "@nextui-org/react";

import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";

import Btn from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import PublicIcon from "@mui/icons-material/Public";
import { useContextPublication } from "../../Context/contextPublication";
import { dbRealTime } from "../../Firebase";

import LikeFill from "../ICONS/LikeFill";
import Heart from "../ICONS/Heart";
import LikeWhite from "../ICONS/LikeWhite";

import Maps from "../ICONS/Maps";
import HeartWhite from "../ICONS/HeartWhite";
import HeartFill from "../ICONS/HeartFill";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import mediumZoom from 'medium-zoom';


import PersonIcon from "@mui/icons-material/Person";
import Swal from "sweetalert2";
const CardPublication = ({
  id,
  idPublication,
  imgFront,
  img,

  name,
  text,
  price1,
  price2,
  skills,
  number,
  img1, // URL de la primera imagen
  img2, // URL de la segunda imagen
  start,
  online,
  time,
  like,
  placeUser,
}) => {
  /**/
  const idCreatorUser = id;

  const { userActive, nameState, imgProfile } = useAuth();
  const [timeString, setTimeString] = useState("");
  const [isCardVisible, setCardVisible] = useState(false);
  const [showLikes, setShowLikes] = useState(false); // Estado para controlar la visibilidad de los likes
  const [showHearts, setShowHearts] = useState(false); // Estado para controlar la visibilidad de los likes

  const [likes, setLikes] = useState([]);

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (imgPath) => {
    setSelectedImage(imgPath);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const update = () => {
      const currentTime = new Date();
      const previousTime = new Date(time);
      const diffInMinutes = Math.floor(
        (currentTime.getTime() - previousTime.getTime()) / (1000 * 60)
      );

      if (diffInMinutes < 60) {
        setTimeString(`${diffInMinutes}min`);
      } else if (diffInMinutes < 1440) {
        setTimeString(`${Math.floor(diffInMinutes / 60)}h`);
      } else {
        setTimeString(`${Math.floor(diffInMinutes / 1440)}d`);
      }
    };

    update();
    const interval = setInterval(update, 60000); // Actualizar cada minuto
    return () => clearInterval(interval);
  }, [time]);

  /**/

  /*Styles Imagenes*/
  /* Estilos de las imágenes */
  const images = [];

  // Verifica si las imágenes están presentes en las props y agrégalas al array
  if (img1) {
    images.push({ imgPath: img1 });
  }
  if (img2) {
    images.push({ imgPath: img2 });
  }
  const theme = useTheme();


  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;
  const [zoomInstance, setZoomInstance] = React.useState(null);

  useEffect(() => {
    // Crea la instancia de medium-zoom al montar el componente
  // Crea la instancia de medium-zoom al montar el componente
  const zoom = mediumZoom('.zoomable-image', {
    background: '#000', // Color de fondo al hacer clic
  });
    setZoomInstance(zoom);

    // Limpia los recursos al desmontar el componente
    return () => {
      zoom.detach();
    };
  }, []); // Asegúrate de que el array de dependencias esté vacío para que se ejecute solo una vez

  

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
  };

  /**/

  const { addPublicationToUser } = useAuth();
  const {
    addLikePublication,
    getLikesForPublication,
    deleteLikePublication,
    addHeartPublication,
    getHeartForPublication,
    deleteHeartPublication,
    addHeartAllPublication,
    deleteHeartAllPublication,
  } = useContextPublication();

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: online ? "#44b700" : "#ccc", // Cambiamos el color aquí
      color: online ? "#44b700" : "#ccc", // Cambiamos el color aquí
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  /**/
  const handleMouseEnter = () => {
    setCardVisible(true);
  };

  const handleMouseLeave = () => {
    setCardVisible(false);
  };
  const handleMouseEnterHeart = () => {
    setShowHearts(true);
  };

  const handleMouseLeaveHeart = () => {
    setShowHearts(false);
  };

  // Resto del código

  const handleMouseEnterLike = () => {
    setShowLikes(true); // Muestra los likes al pasar el mouse por el botón "Like"
  };

  const handleMouseLeaveLike = () => {
    setShowLikes(false); // Oculta los likes al quitar el mouse del botón "Like"
  };
  const handleUser = async () => {
    const result = await Swal.fire({
      title: "¿Estás segur@?",
      html: `Obtendrás los datos de contacto de <strong>${name}</strong>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, contactar",
      allowOutsideClick: false, // Para evitar que el cuadro de diálogo se cierre haciendo clic fuera de él
      cancelButtonText: "Cancelar", // Cambia el texto del botón Cancelar
    });
//
    if (result.isConfirmed) {
      let period = "am";
      const currentTime = new Date();
      let hours = currentTime.getHours();
      let minutes = currentTime.getMinutes();
      if (hours > 12) {
        hours -= 12;
        period = "pm";
      }
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")} ${period}`; // Formatea la hora en formato 12 horas

      
      let redirectUrl;
      if (/^\d{9}$/.test(number)) {
         // Agrega el parámetro "text" a la URL de WhatsApp
         const message = encodeURIComponent(`Hola, ${name}, te contacto desde la pagina Cachueleate.com mi nombre es : `);
         redirectUrl = `https://api.whatsapp.com/send?phone=51${number}&text=${message}`;
      } else if (number.includes("@")) {
        redirectUrl = `mailto:${number}`;
      } else if (number.startsWith("http")) {
        redirectUrl = number;
      }

      if (redirectUrl) {
        const publicationData = {
          id,
          img,
          imgFront,
          name,
          text,
          price1,
          price2,
          skills,
          number,
          img1,
          img2,
          start,
          online,
          hour: formattedTime,
        };
        await addPublicationToUser(publicationData);
        window.open(redirectUrl, "_blank");
      }
    }
  };
  /*Logica de likes*/

  const [likesData, setLikesData] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  const [heartData, setHeartData] = useState([]);
  const [hasHeart, setHasHeart] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userId = id;
      const userPostsRef = ref(dbRealTime, `posts/${userId}`);
      const userPostsSnapshot = await get(userPostsRef);

      if (userPostsSnapshot.exists()) {
        const userPosts = userPostsSnapshot.val();
        const likesData = [];

        for (const postId in userPosts) {
          const posts = userPosts[postId];
          const postsLikesRef = ref(
            dbRealTime,
            `posts/${userId}/${postId}/likes`
          );
          const likesSnapshot = await get(postsLikesRef);

          if (likesSnapshot.exists()) {
            const likesForPost = likesSnapshot.val();
            likesData.push(...Object.values(likesForPost));
          }
        }

        setLikes(likesData);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = id; // Reemplaza con el ID de usuario correcto
      const publicationId = idPublication; // Reemplaza con el ID de publicación correcto
      const likesData = await getLikesForPublication(userId, publicationId);
      // Realiza algo con los datos de 'likesData' aquí
      setLikesData(likesData);
      // Verifica si el usuario ya ha dado like
      const hasLiked = likesData.some((like) => like.idUser === userActive.uid);
      setHasLiked(hasLiked);
    };

    fetchData();
  }, []);

  const handleUserLike = async (
    idUse,
    idPublicationUser,
    idUser,
    nameUser,
    imgUser
  ) => {
    const publicationData = {
      idUser,
      nameUser,
      imgUser,
    };

    if (hasLiked) {
      // Elimina el like del arreglo likesData
      await deleteLikePublication(idUse, idPublicationUser, idUser);
    } else {
      await addLikePublication(publicationData, idUse, idPublicationUser);
    }

    // Actualiza el estado local con los nuevos datos de 'likes'
    const updatedLikesData = await getLikesForPublication(
      idUse,
      idPublicationUser
    );
    setLikesData(updatedLikesData);

    setHasLiked(!hasLiked);
  };

  /**/

  useEffect(() => {
    const fetchDataHeart = async () => {
      const userId = id;
      const userPostsRef = ref(dbRealTime, `posts/${userId}`);
      const userPostsSnapshot = await get(userPostsRef);

      if (userPostsSnapshot.exists()) {
        const userPosts = userPostsSnapshot.val();
        const heartData = [];

        for (const postId in userPosts) {
          const posts = userPosts[postId];
          const postsHeartsRef = ref(
            dbRealTime,
            `posts/${userId}/${postId}/hearts`
          );
          const heartsSnapshot = await get(postsHeartsRef);

          if (heartsSnapshot.exists()) {
            const heartForPost = heartsSnapshot.val();
            heartData.push(...Object.values(heartForPost));
          }
        }
      }
    };

    fetchDataHeart();
  }, [id]);

  useEffect(() => {
    const fetchDataHeart = async () => {
      const userId = id; // Reemplaza con el ID de usuario correcto
      const publicationId = idPublication; // Reemplaza con el ID de publicación correcto
      const heartData = await getHeartForPublication(userId, publicationId);

      // Realiza algo con los datos de 'heartDatas' aquí
      setHeartData(heartData);
      // Verifica si el usuario ya ha dado heart
      const hasHeart = heartData.some(
        (heart) => heart.idUser === userActive.uid
      );
      setHasHeart(hasHeart);
    };

    fetchDataHeart();
  }, []);

  const handleUserHeart = async (
    idCreator,
    idPublicationCreator,
    idUser,
    nameUser,
    imgUser
  ) => {
    const publicationData = {
      idUser,
      nameUser,
      imgUser,
    };

    if (hasHeart) {
      // Elimina el like del arreglo heartData
      await deleteHeartPublication(idCreator, idPublicationCreator, idUser);
      await deleteHeartAllPublication(idUser, idPublicationCreator);
    } else {
      await addHeartPublication(
        publicationData,
        idCreator,
        idPublicationCreator
      );
      await addHeartAllPublication(
        idUser,
        idCreator,
        idPublicationCreator,
        img,
        name,
        text
      );
    }

    // Actualiza el estado local con los nuevos datos de 'heart'
    const updatedHeartData = await getHeartForPublication(
      idCreator,
      idPublicationCreator
    );
    setHeartData(updatedHeartData);

    setHasHeart(!hasHeart);
  };

  /**/

  /**/
  const MAX_WORDS_DISPLAYED = 50;
  const [isExpanded, setIsExpanded] = useState(false);
  const words = text.split(" ");

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  const linkStyle = {
    textDecoration: "underline",

    cursor: "pointer",
  };


  /**/ 

  /**/
  return (
    <article id={`publication_${idPublication}`} /* Resto del código */>
      <div className="container-cardPubli">
        <div className="cardPubliAll">
          <div className="cardPubli-profileImg-starts">
            <div className="cardPubli-profile-name">
              {/*<div className="cardPubli-profile"> el Stack estaba dentro de este div </div>*/}
              <Stack direction="row" spacing={2}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar alt="Perfil user" src={img} />
                </StyledBadge>
              </Stack>

              <div
                className="cardPubli-name"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="cardPubli-hora-name">
                  <div className="cardPubli-name">
                    <Link to={`/ProfileUser/${idCreatorUser}`}>
                      <span className="name-publi author" underline="hover">
                        {name}
                      </span>
                    </Link>
                    <span className="cardPubli-span">
                      {skills[0]} | {skills[1]}
                    </span>
                  </div>
                  <div className="cardPubli-hora">
                  
                    <span> {timeString}</span>
                    <PublicIcon fontSize="small" />
                  </div>
                </div>

                {isCardVisible && (
                  <div className="userCard">
                    {/* Contenido de la tarjeta de información adicional */}
                    <div className="userCard-container">
                      <div className="userCard-img-name-start-front">
                        <div className="userCard-img-name-start">
                          <div className="img-name">
                            <div className="img">
                              <img src={img} alt="img Perfil" />
                            </div>
                            <div className="userCard-name-skill">
                              <span>{name}</span>
                              <span className="cardPubli-span">
                                {skills[0]} | {skills[1]}
                              </span>
                            </div>
                          </div>
                          <div className="start">
                            <Stack spacing={1} className="userCard-starts">
                              <Rating
                                className="userCard-start"
                                name="half-rating-read"
                                value={start} // Usa el valor del estado
                                precision={0.5}
                                readOnly
                              />
                            </Stack>
                          </div>
                        </div>

                        <div className="userCard-front">
                          <div className="imgFront">
                            <img src={imgFront} alt="imagen de portada" />
                          </div>
                        </div>
                        <Link to={`/ProfileUser/${idCreatorUser}`}>
                          <div className="userCardSend">
                            <Button
                              color="primary"
                              variant="bordered"
                              startContent={<PersonIcon />}
                              className="heart"
                              style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <span className="text-heart">Visitar Perfil</span>
                            </Button>
                          </div>
                        </Link>
                      </div>
                    </div>
                    {/* Agrega más información si es necesario */}
                  </div>
                )}
              </div>
            </div>

            <div className="cardPubli-starts-preci">

              <div className="cardPubli-starts-preci-flex">
                <Stack spacing={1} className="cardPubli-starts">
                  <Rating
                    name="half-rating-read"
                    value={start} // Usa el valor del estado
                    precision={0.5}
                    readOnly
                    className="custom-rating" // Añade una clase personalizada
                  />
                </Stack>
                <div className="price">
                  <div>S/.{price1}</div>~<div> S/.{price2}</div>
                </div>
              </div>


            </div>
          </div>

          <div className="cardPubli-description">
            <span>
              {isExpanded
                ? text
                : words.slice(0, MAX_WORDS_DISPLAYED).join(" ")}
              {words.length > MAX_WORDS_DISPLAYED && (
                <button style={linkStyle} onClick={toggleExpanded}>
                  {isExpanded ? "Ver menos" : "Ver más"}
                </button>
              )}
            </span>
            <div className="cardPubli-horaMobile">
              <p>{timeString}</p>
              <PublicIcon fontSize="small" />
            </div>
          </div>


          <div className="cardPubli-publiImgs">
      <Box
        className="img-publicacion"
        sx={{
          maxWidth: "100%",
          height: "100%",
          flexGrow: 1,
          position: "relative",
        }}
      >
        <div
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
        >
          <Box
  component="img"
  className="zoomable-image"
  sx={{
    height: "100%",
    display: "display",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "650px",
    overflow: "hidden",
    width: "100%",
  }}
  src={images[activeStep]?.imgPath}
  onClick={() => handleImageClick(activeStep)}
  alt={name}
/>

          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "45px",
              background:
                "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 70%, rgba(0,0,0,0.9) 100%)",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              top: "10px",
              left: "10px",
            }}
          >
            <div className="publiImgsPlace">
              <Maps /> <span>Lima-Perú, {placeUser}</span>
            </div>
          </Box>
        </div>
        {maxSteps > 1 && (
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            sx={{ bgcolor: "#121212" }}
            nextButton={
              <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                Siguiente
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Atrás
              </Button>
            }
          />
        )}
      </Box>
    </div>









          <div className="like-heart">
            <div
              className={hasLiked ? "likeAnimation" : "likeDefect"}
              onMouseEnter={handleMouseEnterLike}
              onMouseLeave={handleMouseLeaveLike}
            >
              {!likesData.length ? (
                <></>
              ) : (
                <div className="likeContainer">
                  <div
                    className={hasLiked ? "likeAnimation" : "likeDefect"}
                    onMouseEnter={handleMouseEnterLike}
                    onMouseLeave={handleMouseLeaveLike}
                  >
                    <LikeFill />
                    <span className="text-likeCount">{likesData.length}</span>
                  </div>
                </div>
              )}
            </div>

            <div
              className={hasHeart ? "likeAnimation" : "likeDefect"}
              onMouseEnter={handleMouseEnterHeart}
              onMouseLeave={handleMouseLeaveHeart}
            >
              {!heartData.length ? (
                <></>
              ) : (
                <div className="likeContainer">
                  <div
                    className={hasLiked ? "likeAnimation" : "likeDefect"}
                    onMouseEnter={handleMouseEnterHeart}
                    onMouseLeave={handleMouseLeaveHeart}
                  >
                    <HeartFill />
                    <span className="text-likeCount">{heartData.length}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="cardPubli-btns">
            <div className="cardPubli-btn">
              <div className={hasLiked ? "likeBtn" : "like"}>
                <div className="gap-4 items-center userCard-btn ">
                  <Button
                    variant="contained"
                    startContent={hasLiked ? <LikeWhite /> : <Like />}
                    onClick={() =>
                      handleUserLike(
                        id,
                        idPublication,
                        userActive.uid,
                        nameState,
                        imgProfile
                      )
                    }
                    className={hasLiked ? "likeBtn" : "likeFill"}
                  >
                    <span className="text-like">
                      {hasLiked ? "No me gusta" : "Me gusta"}
                    </span>
                  </Button>

                  {showLikes ? (
                    <div className="userLikes">
                      <div className="userLikes-container">
                        {likesData.length > 0 ? (
                          <div className="like-info-container">
                            {likesData.map((like, index) => (
                              <div key={index} className="like-info">
                                <Link
                                  to={`/publications/${like.idPublication}`}
                                >
                                  <Avatar
                                    alt={like.nameUser}
                                    src={like.imgUser}
                                    sx={{ width: 20, height: 20 }}
                                  />
                                </Link>
                                <span style={{ fontSize: "11px" }}>
                                  {like.nameUser}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div>Aún no hay likes 😥</div>
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="cardPubli-btn heartPadre">
              <div className={hasHeart ? "likeBtn" : "like"}>
                <div className=" gap-4 items-center userCard-btn">
                  <Button
                    variant="contained"
                    startContent={hasHeart ? <HeartWhite /> : <Heart></Heart>}
                    onClick={() =>
                      handleUserHeart(
                        id,
                        idPublication,
                        userActive.uid,
                        nameState,
                        imgProfile
                      )
                    }
                    className={hasHeart ? "likeBtn" : "likeFill"}
                  >
                    <span className="text-heart">
                      {hasHeart ? "No guardar -" : "Guardar +"}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
            {userActive.uid === id ? (
              <></>
            ) : (
              <div className="cardPubli-btn contactPadre">
                <div className=" gap-4 items-center userCard-btn">
                  <Button
                    color="primary"
                    variant="bordered"
                    startContent={<PeopleAltIcon />}
                    className="contact"
                    onClick={handleUser}
                  >
                    <span className="text-contact">Contactar</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default CardPublication;
