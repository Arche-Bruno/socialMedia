import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../Context/authContext";
import "./Profile.css";

import whatsapp from "./../../images/ws2.svg";
import fb from "./../../images/fb2.svg";
import email from "./../../images/mail2.svg";
import { UserIcon } from "../CardPublication/FilesNextUi/UserIcon";
import { Button, ButtonGroupProvider } from "@nextui-org/react";

import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { Select, SelectItem } from "@nextui-org/react";

import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
export const animals = [
  {
    label: "Whatsapp",
    value: "Whatsapp",
    description: "Red para que lo contacten",
  },
  {
    label: "Facebook",
    value: "Facebook",
    description: "Red para que lo contacten",
  },
  { label: "Gmail", value: "Gmail", description: "Red para que lo contraten" },
];
const Profile = () => {
  const {
    closedShowProfile,
    ChangeProfile,
    showProfile,

    userActive,
    isUserOnline,
    setUserOnlineStatus,
    signOutAccount,
    updateProfileAccount,
    loading,

    nameState,
    updateName,

    updateImgProfile,
    imgProfile,

    updateImgFrontPage,
    frontPage,

    updateNumber,
    numberPhoneState,

    updatetype,
    typeState,

    updateSkill,

    skillsOne,
    skillsTwo,
    skillsThree,
    skillsFour,

    startsState,
    updateStart,
    loadingProfile,
    setLoadingProfile,
    loadingFront,
    setLoadingFront,
   
  } = useAuth();

  const [selectedValue, setSelectedValue] = useState(typeState);


  let fbUsername = "";

  if (typeState === "Facebook" && numberPhoneState) {
    // Extraer el nombre de usuario de Facebook desde la URL
    const pattern = /(?:https?:\/\/)?(?:www\.)?facebook\.com\/([a-zA-Z0-9.]+)/;
    const match = numberPhoneState.match(pattern);
    fbUsername = match ? match[1] : "";
  }

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: isUserOnline ? "#44b700" : "#ccc", // Cambiamos el color aquí
      color: isUserOnline ? "#44b700" : "#ccc", // Cambiamos el color aquí
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

  const [changeName, setChangeName] = useState({
    name: "user.cachueleate",
    numberPhone: "",
    age: "",
    type: selectedValue,
    skillOne: "Habilidad 1",
    skillTwoo: "Habilidad 2",
    skillThree: "Habilidad 3",
    skillFour: "Habilidad 4",
  });
  const textFieldRef = useRef(null);


  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFront, setSelectedImageFront] = useState(null);

  /** Manejar aumentar start */

  const handleopen = () => {
    ChangeProfile(true);
  };
  const handlecloset = () => {
    closedShowProfile(false);
    window.location.reload();
  };
  /** */

  const handleChangeName = (e) => {
    setChangeName({ ...changeName, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const fileId = e.target.id;
    // Verifica que el archivo sea una imagen
    if (file && file.type.startsWith("image/")) {
      if (fileId === "imgProfile") {
        setSelectedImage(file); // Cambia selectedImage a file en lugar de imageUrl
        setLoadingProfile(true);
        await updateImgProfile(file);
      
      } else if (fileId === "imgFrontPage") {
        setSelectedImageFront(file);
        setLoadingFront(true);
        await updateImgFrontPage(file);
     
      }

      // Establece el resultado en el estado selectedImage
    } else {
      console.error("El archivo seleccionado no es una imagen válida.");
    }

    try {
    } catch (error) {
      console.error("Error al obtener la URL de la imagen:", error);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    const number = changeName.numberPhone;
    const age = parseInt(changeName.age);
{/*
    if (number === "" || age === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Complete sus datos!",
        footer: "<p>Tranquil@</p>",
        position: 'center',
        customClass: {
          popup: 'swal-popup-class',
        },
      });
      return;
    }*/}
    if (!selectedValue) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor seleccione un metodo de contacto",
        footer: "<p> ❌ </p>",
        position: 'center',
        customClass: {
          popup: 'swal-popup-class',
        },
      }).then(() => {
        if (textFieldRef && textFieldRef.current) {
          setTimeout(() => textFieldRef.current.focus(), 0);
        }
      });
      return
    }
    if (selectedValue === "Whatsapp") {
      if (changeName.numberPhone === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ingrese su número de celular por ahí lo contactarán",
          footer: "<p> ❌ </p>",
          position: 'center',
          customClass: {
            popup: 'swal-popup-class',
          },
        }).then(() => {
          if (textFieldRef && textFieldRef.current) {
            setTimeout(() => textFieldRef.current.focus(), 0);
          }
        });

        return;
      }
      if (number.substring(0, 3) === "+51") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Solo digite su número sin '+51'",
          footer: "<p>Tranquil@</p>",
          position: 'center',
          customClass: {
            popup: 'swal-popup-class',
          },
        }).then(() => {
          if (textFieldRef && textFieldRef.current) {
            setTimeout(() => textFieldRef.current.focus(), 0);
          }
        });
        return;
      }
      if (number.length !== 9 || !/^\d+$/.test(number)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ingrese un número de Whatsapp valido",
          footer: "<p>Tomalo con calma</p>",
          position: 'center',
          customClass: {
            popup: 'swal-popup-class',
          },
        }).then(() => {
          if (textFieldRef && textFieldRef.current) {
            setTimeout(() => textFieldRef.current.focus(), 0);
          }
        });
        return;
      }
    } else if (selectedValue === "Gmail") {
      if (
        !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
          changeName.numberPhone
        )
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ingrese un correo electrónico válido",
          footer: "<p>Todo toma un tiempo</p>",
          position: 'center',
          customClass: {
            popup: 'swal-popup-class',
          },
        }).then(() => {
          if (textFieldRef && textFieldRef.current) {
            setTimeout(() => textFieldRef.current.focus(), 0);
          }
        });
        return;
      }
    } else if (selectedValue === "Facebook") {
      const facebookUrlRegex =
        /^(https?:\/\/)?(www\.)?(facebook|fb)\.com\/[a-zA-Z0-9(\.\?)?]/;
      if (!facebookUrlRegex.test(changeName.numberPhone)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ingrese un enlace de FB válido",
          footer: "<p>El tiempo lo sanará</p>",
          position: 'center',
          customClass: {
            popup: 'swal-popup-class',
          },
        }).then(() => {
          if (textFieldRef && textFieldRef.current) {
            setTimeout(() => textFieldRef.current.focus(), 0);
          }
        });
        return;
      }
    }

    if (
      changeName.skillOne === "Habilidad 1" ||
      changeName.skillTwoo === "Habilidad 2"
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Mínimo 2 habilidades",
        footer: "<p>Todo toma un tiempo</p>",
        position: 'center',
        customClass: {
          popup: 'swal-popup-class',
        },
      });
      return;
    }

    if (age < 18) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tienes que ser mayor de edad",
        footer: "<p>Con responsabilidad</p>",
        position: 'center',
        customClass: {
          popup: 'swal-popup-class',
        },
      });
      return;
    }

    try {
      await updateName(changeName.name);
      await updateNumber(changeName.numberPhone);
      await updateSkill(
        changeName.skillOne,
        changeName.skillTwoo,
        changeName.skillThree,
        changeName.skillFour
      );
      await updatetype(selectedValue);

      setSelectedValue(typeState);
      closedShowProfile(false);
      // Recargar la página después de enviar la información
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-Profile">
      <div className="Profile-imgs-info">
        <div className="Profile-protadaImg-ProfileImg">
          <div className="Profile-portadaImg">
            <img src={frontPage} alt="imagen-frontPage" />
          </div>
          <div className="Profile-ProfileImg">
            <Stack direction="row" spacing={2}>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  alt={imgProfile || userActive.photoURL}
                  src={imgProfile || userActive.photoURL}
                  sx={{ width: 50, height: 50 }} // Aquí puedes ajustar el tamaño como prefieras
                />
              </StyledBadge>
            </Stack>
          </div>

          <div className="Profile-stars">
            <Stack spacing={1} className="Profile-stars-cant">
              <Rating
                name="half-rating-read"
                value={startsState} // Usa el valor del estado
                precision={0.5}
                readOnly
              />
            </Stack>
          </div>
        </div>

        <div className="Profile-info">
          <div className="Profile-infoUser">
            
             <Stack direction="row" spacing={2}>
             <Avatar
               
               style={{ backgroundColor: "#0070F0", width: 25, height: 25 }}
             />
           </Stack>
           <span className="author">{nameState || userActive.email}
           </span>
          
           
          </div>
          <div className="Profile-info-skills">
            <div className="skill">
              <span className="dot"></span>
              <span className="text">{skillsOne}</span>
            </div>
            <div className="line"></div>
            <div className="skill">
              <span className="dot"></span>
              <span className="text">{skillsTwo}</span>
            </div>
            <div className="line"></div>
            <div className="skill">
              <span className="dot"></span>
              <span className="text">{skillsThree}</span>
            </div>
            <div className="line"></div>
            <div className="skill">
              <span className="dot"></span>
              <span className="text">{skillsFour}</span>
            </div>
          </div>
          <div className="Profile-info-numberWhatsapp">
            {typeState === "Whatsapp" && (
              <>
                <img
                  src={whatsapp}
                  alt="icon-whatsapp"
                  className="img-whatsapp"
                />
                <span className="Profile-info-number">
                  +51 {numberPhoneState}
                </span>
              </>
            )}
            {typeState === "Facebook" && (
              <>
                <img src={fb} alt="icon-fb" className="img-fb" />
                <span className="Profile-info-number">{fbUsername}</span>
              </>
            )}
            {typeState === "Gmail" && (
              <>
                <img src={email} alt="icon-email" className="img-email" />
                <span className="Profile-info-number">{numberPhoneState}</span>
              </>
            )}
          </div>
        </div>

        <div className="Profile-btnChangeInfo">
          <div className="searchFilter">
            <Button color="primary" variant="shadow" onClick={handleopen}>
              Editar perfil
            </Button>
          </div>

          {showProfile && (
            <div className="container-showProfile">
              <div className="showProfile">
                <span className="showProfileClosed" onClick={handlecloset}>
                  &times;
                </span>
                <div className="showProfile-imgs">
                  {loadingFront ? (
                    <div className="showProfile-FrontPageImg">
                      <Box sx={{ display: "flex" }}>
                        <CircularProgress />
                      </Box>
                    </div>
                  ) : (
                    <div className="showProfile-FrontPageImg">
                      <img src={frontPage} />
                    </div>
                  )}

                  {loadingProfile ? (
                    <div className="showProfile-profileImg">
                      <Box sx={{ display: "flex" }}>
                        <CircularProgress />
                      </Box>
                    </div>
                  ) : (
                    <div className="showProfile-profileImg">
                      <img
                        src={imgProfile || userActive.photoURL}
                        alt="image-profile"
                      />
                    </div>
                  )}

                  <div className="showProfile-changeProfile">
                    <button className="change-profile-btn">
                      <div className="change-profile-btnInput">
                        <div className="change-profile-btnCamera">📷</div>

                        <input
                          type="file"
                          id="imgProfile"
                          accept="image/png, image/jpeg, image/jpg, image/gif, image/bmp, image/webp"
                          className="outlinenone"
                          onChange={handleImageChange}
                          name="imgFront"
                        />
                      </div>
                    </button>
                  </div>
                  <div className="showProfile-changeFront">
                    <button className="change-front-btn">
                      <div className="change-front-btnInput">
                        <div className="change-front-btnCamera">📷</div>

                        <input
                          type="file"
                          id="imgFrontPage"
                          accept="image/png, image/jpeg, image/jpg, image/gif, image/bmp, image/webp"
                          onChange={handleImageChange}
                          className="outlinenoneFront"
                          name="imgProfile"
                        />
                      </div>
                    </button>
                  </div>
                </div>
                
                <form
                  className="showProfile-form"
                  onSubmit={handleUpdateProfile}
                >
                  <div className="showProfile-form-content">
                    <div className="form-userName">
                      <TextField
                        id="name"
                        name="name"
                        label="Nombre Completo"
                        variant="outlined"
                        placeholder="Ejm: Juan Perez Albino"
                        onChange={handleChangeName}
                        className="inputName"
                      />

                      {/*<label htmlFor="name">Nombre :</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Ejm: Bruno Angelo Mallcco Arche"
                        onChange={handleChangeName}
                      />*/}
                      <TextField
                        label="Edad "
                        variant="outlined"
                        type="number"
                        placeholder="Ejm: 22"
                        name="age"
                        id="age"
                        onChange={handleChangeName}
                        className="inputName"
                      />
                    </div>

                    <div className="form-numberPhone-age">
                      <span className="number-age-text">
                        ¡Por donde te gustaría ser contactado ?
                      </span>
                      <div className="form-numberPhone">
                        <div
                          className="flex max-w-xs flex-col gap-2 custom-select-width "
                          style={{ color: "white" }} // Cambiar el color del label aquí
                        >
                          <Select
                            label="Elegir Red Social"
                            placeholder="Seleccionar"
                            value={selectedValue}
                            className="custom-select"
                            onChange={(event) => {
                              setSelectedValue(event.target.value);
                            
                            }}
                            style={{ color: "white", background: "#000" }} // Cambiar el color del label aquí
                          >
                            {animals.map((animal) => (
                              <SelectItem
                                className="itmRed"
                                key={animal.value}
                                value={animal.value}
                              >
                                {animal.label}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>

                        <TextField
                          variant="outlined"
                          label={
                            selectedValue === "Whatsapp"
                              ? "Whatsapp"
                              : selectedValue === "Facebook"
                              ? "Facebook"
                              : selectedValue === "Gmail"
                              ? "Gmail"
                              : "Red social"
                          }
                          placeholder={
                            selectedValue === "Whatsapp"
                              ? "Ingrese su número de Whatsapp"
                              : selectedValue === "Facebook"
                              ? "https://www.facebook.com/NombreDeUsuario/?locale=es_LA"
                              : selectedValue === "Gmail"
                              ? "Ingrese su correo de Gmail"
                              : "Ingrese su información de contacto"
                          }
                          name="numberPhone"
                          id="numberPhone"
                          onChange={handleChangeName}
                          className="inputContact"
                          inputRef={textFieldRef} // Asignar la referencia al campo de textotexto
                        />
                        {/*<label htmlFor="numberPhone">Whatsapp :</label>
                        <input
                          type="text"
                          name="numberPhone"
                          id="numberPhone"
                          placeholder="Ejm: 985908498"
                          onChange={handleChangeName}
                      />*/}
                      </div>
                    </div>
                    <div className="form-skills">
                      <div className="form-skills-label">
                        <hr />
                      </div>

                      <div className="form-skills-one">
                        <TextField
                          variant="outlined"
                          label="Habilidad "
                          type="text"
                          placeholder="(Importante)"
                          name="skillOne"
                          onChange={handleChangeName}
                        />

                        {/*<input
                          type="text"
                          placeholder="operario(Importante)"
                          name="skillOne"
                          onChange={handleChangeName}
                          />*/}

                        <TextField
                          variant="outlined"
                          label="Habilidad 2"
                          type="text"
                          placeholder="(Importante)"
                          name="skillTwoo"
                          id="numberPhone"
                          onChange={handleChangeName}
                        />

                        {/*<input
                          type="text"
                          placeholder="operario(Importante)"
                          name="skillTwoo"
                          onChange={handleChangeName}
                        />*/}
                      </div>
                      <div className="form-skills-two">
                        <TextField
                          variant="outlined"
                          label="Habilidad 3"
                          type="text"
                          placeholder="(Importante)"
                          name="skillThree"
                          id="numberPhone"
                          onChange={handleChangeName}
                        />

                        <TextField
                          variant="outlined"
                          label="Habilidad 4   "
                          type="text"
                          placeholder="(Importante)"
                          name="skillFour"
                          id="numberPhone"
                          onChange={handleChangeName}
                        />

                        {/*<input
                          type="text"
                          placeholder="ejm : operario"
                          name="skillThree"
                          onChange={handleChangeName}
                        />
                        <input
                          type="text"
                          placeholder="ejm : operario"
                          name="skillFour"
                          onChange={handleChangeName}
                        />*/}
                      </div>
                    </div>

                    <button type="submit">Actualizar Perfil</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      {/*<button onClick={handleAum}>Aumentar</button>*/}
    </div>
  );
};

export default Profile;
