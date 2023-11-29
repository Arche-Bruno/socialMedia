import React, { useState } from "react";
import { useAuth } from "../../Context/authContext";
import "./CreatePost.css";
import picture from "./../../images/image.svg";
import event from "./../../images/eventFive.svg";
import article from "./../../images/article.svg";
import btnMas from "./../../images/mas.png";
import { useContextPublication } from "../../Context/contextPublication";
/*Para los emoticones */
import EmojiPicker from "emoji-picker-react";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import iconCate from "./../../images/iconCategory.svg";
import iconCateOpen from "./../../images/iconCategoryOpen.svg";
import iconPlace from "./../../images/iconPlace.svg";
import iconPlaceOpen from "./../../images/iconPlaceOpen.svg";
import { Input } from "@nextui-org/react";
import Swal from "sweetalert2";
import "animate.css";
import {
  category,
  occupation,
  ocuppationHome,
  occupationCulinary,
  occupationTecnology,
  occupationShow,
  occupationHealth,
  occupationEducation,
  occupationSecurity,
  occupationArt,
  occupationProfessional,
  occupationEvironmental,
  occupationVentas,
  place,
  occupationProduction,
  occupationCoffee,
} from "../FilterJob/FilesUi/data";
import { Select, SelectItem } from "@nextui-org/select";
import { set } from "firebase/database";

import { Textarea } from "@nextui-org/react";

const CreatePost = () => {
  const {
    userActive,
    imgProfile,
    nameState,
    handlePublication,
    handleShowPostClosed,
    showCreatePost,
  } = useAuth();
  const {
    getDataCreatePost,
    updateImgPublication1,
    imgPublication1,
    loadingImagen1,
    setLoadingImagen1,
    loadingImagen2,
    setLoadingImagen2,
    updateImgPublication2,
    imgPublication2,
  } = useContextPublication();

  const [dataPost, setDataPost] = useState({
    textPost: "",
    category: "",
    occupation: "",
    place: "",
    rango1: 0,
    rango2: 0,
  });
 

  const [imgPost1, setImgPost1] = useState(null);
  const [imgPost2, setImgPost2] = useState(null);
  const handleOpen = () => {
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
  const handleClosed = () => {
    handleShowPostClosed(false);
    setImgPost1(null);
    setImgPost2(null);

    setUserInteracted({
      changeCategory: false,
      changeOccupation: false,
      changePlace: false,
    });
   
  };
  const [selectedCategoryPost, setSelectedCategoryPost] = useState({
    category: "Construcción",
  });

  const [userInteracted, setUserInteracted] = useState({
    changeCategory: false,
    changeOccupation: false,
    changePlace: false,
  });
  const handleDataPost = (e) => {
    const { name, value } = e.target;

    setSelectedCategoryPost({
      ...selectedCategoryPost,
      [name]: value,
    });

    setDataPost({ ...dataPost, [name]: value });

    // Actualizar userInteracted basado en las condiciones
    setUserInteracted((prevState) => ({
      ...prevState,
      changeCategory: prevState.changeCategory || name === "category",
      changeOccupation: prevState.changeOccupation || name === "occupation",
      changePlace: prevState.changePlace || name === "place",
    }));
  };

  const handleImgPost = async (e) => {
    const file = e.target.files[0];
    const fileId = e.target.id;

    try {
      if (file && file.type.startsWith("image/")) {
        if (fileId === "imgPost1") {
          setImgPost1(file);
          setLoadingImagen1(true);
          await updateImgPublication1(file); // Pasa el archivo directamente
        }

        if (fileId === "imgPost2") {
          setImgPost2(file);
          setLoadingImagen2(true);
          await updateImgPublication2(file);
        }
      } else {
        console.log("El archivo seleccionado no es una imagen válida");
      }
    } catch (error) {
      console.error("Hubo un error:", error);
    }
  };

  /* Para los emojis */
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const handleEmojiClick = (event) => {
    if (event.emoji) {
      const emoji = event.emoji;
      // Agregar emoji al campo textPost
      setDataPost((prevData) => ({
        ...prevData,
        textPost: prevData.textPost + emoji,
      }));
    } else {
      console.log("Hubo un error al obtener el emoji");
    }
  
    setShowEmojiPicker((prevShowEmojiPicker) => !prevShowEmojiPicker);
  };
  
  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (dataPost.textPost === "") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "por favor rellene un texto",
        footer: '<p href="#">Relajate</p>',
        position: "center",
        customClass: {
          popup: "swal-popup-class",
        },
      });
    }
    if (dataPost.category === "") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "por favor seleccione una categoria",
        footer: '<p href="#">Relajate</p>',
        position: "center",
        customClass: {
          popup: "swal-popup-class",
        },
      });
    }
    if (dataPost.occupation === "") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "por favor seleccione una ocupacion",
        footer: '<p href="#">Relajate</p>',
        position: "center",
        customClass: {
          popup: "swal-popup-class",
        },
      });
    }
    if (dataPost.place === "") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "por favor seleccione un lugar",
        footer: '<p href="#">Relajate</p>',
        position: "center",
        customClass: {
          popup: "swal-popup-class",
        },
      });
    }
    if (dataPost.rango1 === 0) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor indique su precio",
        footer: '<p href="#">Relajate</p>',
        position: "center",
        customClass: {
          popup: "swal-popup-class",
        },
      });
    }
    if (dataPost.rango2 === 0) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor indique su segundo precio",
        footer: '<p href="#">Relajate</p>',
        position: "center",
        customClass: {
          popup: "swal-popup-class",
        },
      });
    }

    // Resto del código si no se cumple ninguna de las condiciones anteriores
    try {
      await getDataCreatePost(dataPost);
      // Limpia los datos del formulario después de crear la publicación
      setDataPost({
        textPost: "",
        category: "",
        occupation: "",
        place: "",
        rango1: 0,
        rango2: 0,
      });
      setImgPost1(null);
      setImgPost2(null);

      handleShowPostClosed(false); // Cierra el formulario después de crear la publicación
      // Recargar la página después de crear la publicación
      window.location.reload();
    } catch (error) {
      console.error("El error es : ", error);
    }
  };
  return (
    <div className="container-createPost">
      <div className="createPost-search-icons">
        <div className="createPost-profile-btnSearch">
          <div className="createPost-profileImg">
            <img src={imgProfile} alt="imagen-profile" />
          </div>

          <div>
            <button className="createPost-btnSearch" onClick={handleOpen}>
              Publicar mis servicios +
            </button>
          </div>
          {showCreatePost && (
            <div className="container-showCreatePost">
              <div className="container-showCreatePostDaddy">
                <div className="showCreatePost">
                  <span className="showCreatePostClosed" onClick={handleClosed}>
                    &times;
                  </span>
                  <div className="showCreatePost-img-nameSpan">
                    <div className="showCreatePost-img">
                      <img src={imgProfile} alt="imagen-profile" />
                    </div>
                    <div className="showCreatePost-nameSpan">
                      <h1 className="name">{nameState || userActive.email}</h1>
                      <span className="span">Publicar +</span>
                    </div>
                  </div>
                  <form
                    action=""
                    className="showCreatePost-form"
                    onSubmit={handleCreatePost}
                  >
                    <div className="w-full flex flex-col gap-2 max-w-[240px]  text-black">
                      <Textarea
                        variant="underlined"
                        name="textPost"
                        labelPlacement="outside"
                        placeholder="quieres escribir algo?"
                        onChange={handleDataPost}
                        value={dataPost.textPost}
                      />
                    </div>

                    <div className="emoji-container-createPost">
                      {showEmojiPicker ? (
                        <div className="emoji-picker">
                          <EmojiPicker onEmojiClick={handleEmojiClick} />
                          <button onClick={handleEmojiClick}>Cerrar</button>
                        </div>
                      ) : (
                        <button onClick={handleEmojiClick}>🙂</button> // Agrega un botón con una carita para abrir el selector de emoji
                      )}
                    </div>
                    <div className="showCreatePost-form-imgs">
                      <div className="showCreatePost-form-imgs1-2">
                        <div className="showCreatePost-form-img1">
                          {!imgPost1 ? (
                            <div className="showCreatePost-contenidoImg">
                              <img
                                src={btnMas}
                                alt="containerImg"
                                className="containerImg"
                              />
                              <input
                                type="file"
                                id="imgPost1"
                                accept="image/png, image/jpeg,image/jpg, image/bmp, image/webp"
                                className="imgPost1"
                                onChange={handleImgPost}
                                name="imgPost1"
                              />
                            </div>
                          ) : loadingImagen1 ? (
                            <Box sx={{ display: "flex" }}>
                              <CircularProgress />
                            </Box>
                          ) : (
                            <div className="showCreatePost-contenidoImg1">
                              <img src={imgPublication1} alt="img-1" />
                            </div>
                          )}
                        </div>

                        <div className="showCreatePost-form-img2">
                          {!imgPost2 ? (
                            <div className="showCreatePost-contenidoImg">
                              <img
                                src={btnMas}
                                alt="containerImg"
                                className="containerImg"
                              />
                              <input
                                type="file"
                                id="imgPost2"
                                accept="image/png, image/jpeg,image/jpg, image/bmp, image/webp"
                                className="imgPost1"
                                onChange={handleImgPost}
                                name="imgPost2"
                              />
                            </div>
                          ) : loadingImagen2 ? (
                            <Box sx={{ display: "flex" }}>
                              <CircularProgress />
                            </Box>
                          ) : (
                            <div className="showCreatePost-contenidoImg1">
                              <img src={imgPublication2} alt="img-1" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <hr />
                    <div className="showCreatePost-container-btn-select ">
                      <div className="showCreatePost-btn-select category">
                        <Select
                          className="dark text-foreground bg-background max-w-xs selectPost"
                          label="Categoria"
                          placeholder="Selecciona un Rugro"
                          startContent={
                            userInteracted.changeCategory ? (
                              <img
                                src={iconCateOpen}
                                width={15}
                                height={15}
                                alt="iconCateOpen"
                                className="icon-transition" // Clase CSS para la transición
                              />
                            ) : (
                              <img
                                src={iconCate}
                                width={15}
                                height={15}
                                alt="iconCate"
                                className="icon-transition" // Clase CSS para la transición
                              />
                            )
                          }
                          defaultSelectedKeys={["Construcción"]}
                          name="category"
                          onChange={handleDataPost}
                        >
                          {category.map((animal) => (
                            <SelectItem
                              color="default"
                              key={animal.value}
                              value={animal.value}
                            >
                              {animal.label}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>

                      <div className="showCreatePost-btn-select occupation">
                        {selectedCategoryPost.value === "Construcción" ? (
                          <Select
                            className="dark text-foreground bg-background max-w-xs selectPost"
                            label="Ocupación"
                            placeholder="Selecciona una ocupación"
                            startContent={
                              userInteracted.changeOccupation ? (
                                <img
                                  src={iconCateOpen}
                                  width={15}
                                  height={15}
                                  alt="iconCateOpen"
                                  className="icon-transition" // Clase CSS para la transición
                                />
                              ) : (
                                <img
                                  src={iconCate}
                                  width={15}
                                  height={15}
                                  alt="iconCate"
                                  className="icon-transition" // Clase CSS para la transición
                                />
                              )
                            }
                            defaultSelectedKeys={occupation.value}
                            name="occupation"
                            onChange={handleDataPost}
                          >
                            {occupation.map((occupation) => (
                              <SelectItem
                                color="default"
                                key={occupation.value}
                                value={occupation.value}
                              >
                                {occupation.value}
                              </SelectItem>
                            ))}
                          </Select>
                          
                        ) : selectedCategoryPost.category === "Tecnología" ? (
                          <Select
                            className="dark text-foreground bg-background max-w-xs selectPost"
                            label="Ocupación"
                            placeholder="Selecciona una ocupación"
                            startContent={
                              userInteracted.changeOccupation ? (
                                <img
                                  src={iconCateOpen}
                                  width={15}
                                  height={15}
                                  alt="iconCateOpen"
                                  className="icon-transition" // Clase CSS para la transición
                                />
                              ) : (
                                <img
                                  src={iconCate}
                                  width={15}
                                  height={15}
                                  alt="iconCate"
                                  className="icon-transition" // Clase CSS para la transición
                                />
                              )
                            }
                            defaultSelectedKeys={occupation.value}
                            name="occupation"
                            onChange={handleDataPost}
                          >
                            {occupationTecnology.map((occupation) => (
                              <SelectItem
                                color="default"
                                key={occupation.value}
                                value={occupation.value}
                              >
                                {occupation.value}
                              </SelectItem>
                            ))}
                          </Select>
                        ) : selectedCategoryPost.category === "Hogar" ? (
                          <Select
                            className="dark text-foreground bg-background max-w-xs selectPost"
                            label="Ocupación"
                            placeholder="Selecciona una ocupación"
                            startContent={
                              userInteracted.changeOccupation ? (
                                <img
                                  src={iconCateOpen}
                                  width={15}
                                  height={15}
                                  alt="iconCateOpen"
                                  className="icon-transition" // Clase CSS para la transición
                                />
                              ) : (
                                <img
                                  src={iconCate}
                                  width={15}
                                  height={15}
                                  alt="iconCate"
                                  className="icon-transition" // Clase CSS para la transición
                                />
                              )
                            }
                            defaultSelectedKeys={ocuppationHome.value}
                            name="occupation"
                            onChange={handleDataPost}
                          >
                            {ocuppationHome.map((occupation) => (
                              <SelectItem
                                color="default"
                                key={occupation.value}
                                value={occupation.value}
                              >
                                {occupation.label}
                              </SelectItem>
                            ))}
                          </Select>
                        ) : selectedCategoryPost.category === "Produccíon" ? (
                          <Select
                            className="dark text-foreground bg-background max-w-xs selectPost"
                            label="Ocupación"
                            placeholder="Selecciona una ocupación"
                            startContent={
                              userInteracted.changeOccupation ? (
                                <img
                                  src={iconCateOpen}
                                  width={15}
                                  height={15}
                                  alt="iconCateOpen"
                                  className="icon-transition" // Clase CSS para la transición
                                />
                              ) : (
                                <img
                                  src={iconCate}
                                  width={15}
                                  height={15}
                                  alt="iconCate"
                                  className="icon-transition" // Clase CSS para la transición
                                />
                              )
                            }
                            defaultSelectedKeys={occupationCulinary.value}
                            name="occupation"
                            onChange={handleDataPost}
                          >
                            {occupationProduction.map((occupation) => (
                              <SelectItem
                                color="default"
                                key={occupation.value}
                                value={occupation.value}
                              >
                                {occupation.label}
                              </SelectItem>
                            ))}
                          </Select>
                        )  : selectedCategoryPost.category === "Cocina en general" ? (
                          <Select
                            className="dark text-foreground bg-background max-w-xs selectPost"
                            label="Ocupación"
                            placeholder="Selecciona una ocupación"
                            startContent={
                              userInteracted.changeOccupation ? (
                                <img
                                  src={iconCateOpen}
                                  width={15}
                                  height={15}
                                  alt="iconCateOpen"
                                  className="icon-transition" // Clase CSS para la transición
                                />
                              ) : (
                                <img
                                  src={iconCate}
                                  width={15}
                                  height={15}
                                  alt="iconCate"
                                  className="icon-transition" // Clase CSS para la transición
                                />
                              )
                            }
                            defaultSelectedKeys={occupationCulinary.value}
                            name="occupation"
                            onChange={handleDataPost}
                          >
                            {occupationCulinary.map((occupation) => (
                              <SelectItem
                                color="default"
                                key={occupation.value}
                                value={occupation.value}
                              >
                                {occupation.label}
                              </SelectItem>
                            ))}
                          </Select>
                        ) : selectedCategoryPost.category === "Cafetería" ? (
                          <Select
                            className="dark text-foreground bg-background max-w-xs selectPost"
                            label="Ocupación"
                            placeholder="Selecciona una ocupación"
                            startContent={
                              userInteracted.changeOccupation ? (
                                <img
                                  src={iconCateOpen}
                                  width={15}
                                  height={15}
                                  alt="iconCateOpen"
                                  className="icon-transition" // Clase CSS para la transición
                                />
                              ) : (
                                <img
                                  src={iconCate}
                                  width={15}
                                  height={15}
                                  alt="iconCate"
                                  className="icon-transition" // Clase CSS para la transición
                                />
                              )
                            }
                            defaultSelectedKeys={occupationCulinary.value}
                            name="occupation"
                            onChange={handleDataPost}
                          >
                            {occupationCoffee.map((occupation) => (
                              <SelectItem
                                color="default"
                                key={occupation.value}
                                value={occupation.value}
                              >
                                {occupation.label}
                              </SelectItem>
                            ))}
                          </Select>
                        ) : selectedCategoryPost.category === "Espectaculos" ? (
                          <Select
                            className="dark text-foreground bg-background max-w-xs selectPost"
                            label="Ocupación"
                            placeholder="Selecciona una ocupación"
                            startContent={
                              userInteracted.changeOccupation ? (
                                <img
                                  src={iconCateOpen}
                                  width={15}
                                  height={15}
                                  alt="iconCateOpen"
                                  className="icon-transition" // Clase CSS para la transición
                                />
                              ) : (
                                <img
                                  src={iconCate}
                                  width={15}
                                  height={15}
                                  alt="iconCate"
                                  className="icon-transition" // Clase CSS para la transición
                                />
                              )
                            }
                            defaultSelectedKeys={occupationShow.value}
                            name="occupation"
                            onChange={handleDataPost}
                          >
                            {occupationShow.map((occupation) => (
                              <SelectItem
                                color="default"
                                key={occupation.value}
                                value={occupation.value}
                              >
                                {occupation.label}
                              </SelectItem>
                            ))}
                          </Select>
                        ) : selectedCategoryPost.category === "Salud" ? (
                          <Select
                            className="dark text-foreground bg-background max-w-xs selectPost"
                            label="Ocupación"
                            placeholder="Selecciona una ocupación"
                            startContent={
                              userInteracted.changeOccupation ? (
                                <img
                                  src={iconCateOpen}
                                  width={15}
                                  height={15}
                                  alt="iconCateOpen"
                                  className="icon-transition" // Clase CSS para la transición
                                />
                              ) : (
                                <img
                                  src={iconCate}
                                  width={15}
                                  height={15}
                                  alt="iconCate"
                                  className="icon-transition" // Clase CSS para la transición
                                />
                              )
                            }
                            defaultSelectedKeys={occupationHealth.value}
                            name="occupation"
                            onChange={handleDataPost}
                          >
                            {occupationHealth.map((occupation) => (
                              <SelectItem
                                color="default"
                                key={occupation.value}
                                value={occupation.value}
                              >
                                {occupation.label}
                              </SelectItem>
                            ))}
                          </Select>
                        ) : selectedCategoryPost.category === "Educación" ? (
                          <Select
                            className="dark text-foreground bg-background max-w-xs selectPost"
                            label="Ocupación"
                            placeholder="Selecciona una ocupación"
                            startContent={
                              userInteracted.changeOccupation ? (
                                <img
                                  src={iconCateOpen}
                                  width={15}
                                  height={15}
                                  alt="iconCateOpen"
                                  className="icon-transition" // Clase CSS para la transición
                                />
                              ) : (
                                <img
                                  src={iconCate}
                                  width={15}
                                  height={15}
                                  alt="iconCate"
                                  className="icon-transition" // Clase CSS para la transición
                                />
                              )
                            }
                            defaultSelectedKeys={occupationEducation.value}
                            name="occupation"
                            onChange={handleDataPost}
                          >
                            {occupationEducation.map((occupation) => (
                              <SelectItem
                                color="default"
                                key={occupation.value}
                                value={occupation.value}
                              >
                                {occupation.label}
                              </SelectItem>
                            ))}
                          </Select>
                        ) : selectedCategoryPost.category === "Seguridad" ? (
                          <Select
                            className="dark text-foreground bg-background max-w-xs selectPost"
                            label="Ocupación"
                            placeholder="Selecciona una ocupación"
                            startContent={
                              userInteracted.changeOccupation ? (
                                <img
                                  src={iconCateOpen}
                                  width={15}
                                  height={15}
                                  alt="iconCateOpen"
                                  className="icon-transition" // Clase CSS para la transición
                                />
                              ) : (
                                <img
                                  src={iconCate}
                                  width={15}
                                  height={15}
                                  alt="iconCate"
                                  className="icon-transition" // Clase CSS para la transición
                                />
                              )
                            }
                            defaultSelectedKeys={occupationSecurity.value}
                            name="occupation"
                            onChange={handleDataPost}
                          >
                            {occupationSecurity.map((occupation) => (
                              <SelectItem
                                color="default"
                                key={occupation.value}
                                value={occupation.value}
                              >
                                {occupation.label}
                              </SelectItem>
                            ))}
                          </Select>
                        ) : selectedCategoryPost.category ===
                          "Arte y Entreten." ? (
                          <Select
                            className="dark text-foreground bg-background max-w-xs selectPost"
                            label="Ocupación"
                            placeholder="Selecciona una ocupación"
                            startContent={
                              userInteracted.changeOccupation ? (
                                <img
                                  src={iconCateOpen}
                                  width={15}
                                  height={15}
                                  alt="iconCateOpen"
                                  className="icon-transition" // Clase CSS para la transición
                                />
                              ) : (
                                <img
                                  src={iconCate}
                                  width={15}
                                  height={15}
                                  alt="iconCate"
                                  className="icon-transition" // Clase CSS para la transición
                                />
                              )
                            }
                            defaultSelectedKeys={occupationArt.value}
                            name="occupation"
                            onChange={handleDataPost}
                          >
                            {occupationArt.map((occupation) => (
                              <SelectItem
                                color="default"
                                key={occupation.value}
                                value={occupation.value}
                              >
                                {occupation.label}
                              </SelectItem>
                            ))}
                          </Select>
                        ) : selectedCategoryPost.category ===
                          "Serv. Profesionales" ? (
                          <Select
                            className="dark text-foreground bg-background max-w-xs selectPost"
                            label="Ocupación"
                            placeholder="Selecciona una ocupación"
                            startContent={
                              userInteracted.changeOccupation ? (
                                <img
                                  src={iconCateOpen}
                                  width={15}
                                  height={15}
                                  alt="iconCateOpen"
                                  className="icon-transition" // Clase CSS para la transición
                                />
                              ) : (
                                <img
                                  src={iconCate}
                                  width={15}
                                  height={15}
                                  alt="iconCate"
                                  className="icon-transition" // Clase CSS para la transición
                                />
                              )
                            }
                            defaultSelectedKeys={occupationProfessional.value}
                            name="occupation"
                            onChange={handleDataPost}
                          >
                            {occupationProfessional.map((occupation) => (
                              <SelectItem
                                color="default"
                                key={occupation.value}
                                value={occupation.value}
                              >
                                {occupation.label}
                              </SelectItem>
                            ))}
                          </Select>
                        ) : selectedCategoryPost.category ===
                          "Medio Ambiente" ? (
                          <Select
                            className="dark text-foreground bg-background max-w-xs selectPost"
                            label="Ocupación"
                            placeholder="Selecciona una ocupación"
                            startContent={
                              userInteracted.changeOccupation ? (
                                <img
                                  src={iconCateOpen}
                                  width={15}
                                  height={15}
                                  alt="iconCateOpen"
                                  className="icon-transition" // Clase CSS para la transición
                                />
                              ) : (
                                <img
                                  src={iconCate}
                                  width={15}
                                  height={15}
                                  alt="iconCate"
                                  className="icon-transition" // Clase CSS para la transición
                                />
                              )
                            }
                            defaultSelectedKeys={occupation.value}
                            name="occupation"
                            onChange={handleDataPost}
                          >
                            {occupationEvironmental.map((occupation) => (
                              <SelectItem
                                color="default"
                                key={occupation.value}
                                value={occupation.value}
                              >
                                {occupation.label}
                              </SelectItem>
                            ))}
                          </Select>
                       ) :selectedCategoryPost.category === "Atención al cliente" ? (
                        <Select
                          className="dark text-foreground bg-background max-w-xs selectPost"
                          label="Ocupación"
                          placeholder="Selecciona una ocupación"
                          startContent={
                            userInteracted.changeOccupation ? (
                              <img
                                src={iconCateOpen}
                                width={15}
                                height={15}
                                alt="iconCateOpen"
                                className="icon-transition"
                              />
                            ) : (
                              <img
                                src={iconCate}
                                width={15}
                                height={15}
                                alt="iconCate"
                                className="icon-transition"
                              />
                            )
                          }
                          defaultSelectedKeys={occupation.value}
                          name="occupation"
                          onChange={handleDataPost}
                        >
                          {occupationVentas.map((occupation) => (
                            <SelectItem
                              color="default"
                              key={occupation.value}
                              value={occupation.value}
                            >
                              {occupation.label}
                            </SelectItem>
                          ))}
                        </Select>
                    ): (
                      <Select
                      className="dark text-foreground bg-background max-w-xs selectPost"
                      label="Ocupación"
                      placeholder="Selecciona una ocupación"
                      startContent={
                        userInteracted.changeOccupation ? (
                          <img
                            src={iconCateOpen}
                            width={15}
                            height={15}
                            alt="iconCateOpen"
                            className="icon-transition"
                          />
                        ) : (
                          <img
                            src={iconCate}
                            width={15}
                            height={15}
                            alt="iconCate"
                            className="icon-transition"
                          />
                        )
                      }
                      defaultSelectedKeys={occupation.value}
                      name="occupation"
                      onChange={handleDataPost}
                    >
                      {occupation.map((occupation) => (
                        <SelectItem
                          color="default"
                          key={occupation.value}
                          value={occupation.value}
                        >
                          {occupation.label}
                        </SelectItem>
                      ))}
                    </Select>
                        )}
                      </div>

                      <div className="showCreatePost-btn-select place">
                        <Select
                          className="dark text-foreground bg-background max-w-xs selectPost"
                          label="Lugar"
                          startContent={
                            userInteracted.changePlace ? (
                              <img
                                src={iconPlaceOpen}
                                width={15}
                                height={15}
                                alt="iconCateOpen"
                                className="icon-transition" // Clase CSS para la transición
                              />
                            ) : (
                              <img
                                src={iconPlace}
                                width={15}
                                height={15}
                                alt="iconCate"
                                className="icon-transition" // Clase CSS para la transición
                              />
                            )
                          }
                          defaultSelectedKeys={["Lima"]}
                          name="place"
                          onChange={handleDataPost}
                        >
                          {place.map((animal) => (
                            <SelectItem
                              color="default"
                              key={animal.value}
                              value={animal.value}
                            >
                              {animal.label}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                    </div>

                    <div className="flex w-full flex mb-6 md:mb-0 gap-4 dark text-foreground text-white">
                      <Input
                        placeholder="0.00"
                        labelPlacement="outside"
                        onChange={handleDataPost}
                        name="rango1"
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              S/.
                            </span>
                          </div>
                        }
                        endContent={
                          <div className="flex items-center">
                            <label className="sr-only" htmlFor="currency">
                              Currency
                            </label>
                            <select
                              className="outline-none border-0 bg-transparent text-default-400 text-small"
                              id="currency"
                              name="currency"
                            >
                              <option>Sol ( S/ ).</option>
                              <option>USD</option>
                              <option>EUR</option>
                            </select>
                          </div>
                        }
                        type="number"
                      />

                      <Input
                        placeholder="0.00"
                        labelPlacement="outside"
                        onChange={handleDataPost}
                        name="rango2"
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              S/.
                            </span>
                          </div>
                        }
                        endContent={
                          <div className="flex items-center">
                            <label className="sr-only" htmlFor="currency">
                              Currency
                            </label>
                            <select
                              className="outline-none border-0 bg-transparent text-default-400 text-small"
                              id="currency"
                              name="currency"
                            >
                              <option>Sol ( S/ ).</option>
                              <option>USD</option>
                              <option>EUR</option>
                            </select>
                          </div>
                        }
                        type="number"
                      />
                    </div>
                    <hr />
                    <button type="submit" className="showCreatePost-btnSubmit">
                      Publicar
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="createPost-btnsIcons">
          <button className="createPost-btn" onClick={handleOpen}>
            <img src={picture} alt="" />

            <span>Contenido multimedia</span>
          </button>
          <button className="createPost-btn" onClick={handleOpen}>
            <img src={event} alt="" />
            <span>Evento</span>
          </button>
          <button className="createPost-btn" onClick={handleOpen}>
            <img src={article} alt="" />
            <span>Escribir articulo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
