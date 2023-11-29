import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import "./ProfileUserFotos.css";

/*Para el subir foto*/
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import { useAuth } from "../../Context/authContext";
import { dbRealTime } from "../../Firebase";
import { onValue, ref } from "firebase/database";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DeleteIcon from "@mui/icons-material/Delete";

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const ProfileUserFotos = ({ id,name }) => {
  const [imgProfileUser, setimgProfileUser] = useState(null);
  const [contImages, setContImages] = useState(null);

  const { updateImgProfileUser, userActive, deleteImage } = useAuth();

  /*Para el zoom de la imagen*/

  const [zoom, setZoom] = useState(1);
  const maxZoom = 5; // Establece el máximo valor de zoom que deseas
  const minZoom = 0.2; // Establece el mínimo valor de zoom que deseas

  const handleScroll = (event) => {
    if (event.deltaY < 0) {
      setZoom((prevZoom) => (prevZoom < maxZoom ? prevZoom + 0.1 : maxZoom));
    } else {
      setZoom((prevZoom) => (prevZoom > minZoom ? prevZoom - 0.1 : minZoom));
    }
  };
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartPosition({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      setPosition({
        x: event.clientX - startPosition.x,
        y: event.clientY - startPosition.y,
      });
    }
  };

  // ... (resto del código)
  /**/

  /*Para eliminar la imagen*/
  const handleImageDelete = (userId, imgId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta imagen?")) {
      deleteImage(userId,imgId);
      handleCloseModal(); // Cierra el modal después de eliminar la imagen
    }
  };
console.log(contImages)

  /**/
  /*Para darle clic a la imagen y engrandarlo*/

  // El resto de tu código

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  /**/

  useEffect(() => {
    const contImagesRef = ref(dbRealTime, `users/${id}/contImages`);
    const getContImages = onValue(contImagesRef, (snapshot) => {
      const currentContImages = snapshot.val() || [];
      setContImages(currentContImages);
    });

    return () => {
      // Aquí, debes detener el listener de Firebase
      getContImages(); // Esto probablemente no sea la función que detiene el listener
    };
  }, [id]);

  const handleImageChange = async (e) => {
    const userUid = id;
    console.log("hola");
    const file = e.target.files[0];
    const fileId = e.target.id;
    // Verifica que el archivo sea una imagen
    if (file && file.type.startsWith("image/")) {
      if (fileId === "imgProfileUser") {
        setimgProfileUser(file); // Cambia selectedImage a file en lugar de imageUrl
        await updateImgProfileUser(file, userUid);
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
  console.log(imgProfileUser);
  const actions = [
    { icon: <FileCopyIcon />, name: "Copy" },
    { icon: <SaveIcon />, name: "Save" },
    { icon: <PrintIcon />, name: "Print" },
    { icon: <ShareIcon />, name: "Share" },
  ];
  return (
    <div className="container-fotos">
      {contImages && contImages.length === 0 ? (
        <div className="fotosStill">
          <span className="fotosStillSpan">El usuario {name} aún no sube imagenes 🤔 </span>
          {id === userActive.uid ? (
            <>
              <SpeedDial
                ariaLabel="SpeedDial basic example"
                className="custom-speed-dial"
                sx={{ position: "absolute", bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
              >
                {actions.map((action, index) => (
                  <SpeedDialAction
                    key={index}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={() => {
                      if (index === 1) {
                        const input = document.createElement("input");
                        input.type = "file";
                        input.accept = "image/*";
                        input.id = "imgProfileUser";
                        input.onchange = handleImageChange;
                        input.click();
                      }
                    }}
                  />
                ))}
              </SpeedDial>
            </>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <ImageList
          sx={{ height: 800 }}
          variant="woven"
          cols={3}
          gap={8}
          className="fotos"
        >
          {contImages?.map((image, index) => (
  <ImageListItem
    key={image.id}
    onClick={() => handleImageClick(image.url)}
  >
    <img
      srcSet={`${image.url}`}
      src={`${image.url}`}
      alt={`Image ${index + 1}`}
      loading="lazy"
    />
    {id === userActive.uid && (
      <ImageListItemBar
        position="top"
        actionIcon={
          <div>
            <IconButton
              sx={{ color: "white" }}
              aria-label="delete"
              onClick={(e) => {
                e.stopPropagation();
                handleImageDelete(id, image.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        }
        actionPosition="left"
      />
    )}
  </ImageListItem>
))}

          {id === userActive.uid ? (
            <>
              <SpeedDial
                ariaLabel="SpeedDial basic example"
                className="custom-speed-dial"
                sx={{ position: "absolute", bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
              >
                {actions.map((action, index) => (
                  <SpeedDialAction
                    key={index}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={() => {
                      if (index === 1) {
                        const input = document.createElement("input");
                        input.type = "file";
                        input.accept = "image/*";
                        input.id = "imgProfileUser";
                        input.onchange = handleImageChange;
                        input.click();
                      }
                    }}
                  />
                ))}
              </SpeedDial>
            </>
          ) : (
            <></>
          )}
        </ImageList>
      )}

      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogContent>
          {selectedImage && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden", // Añade este estilo para evitar el desbordamiento
              }}
              onWheel={handleScroll}
            >
              <img
                src={selectedImage}
                alt="Selected"
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                  transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
                  cursor: isDragging ? "grabbing" : "grab",
                }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
              />
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileUserFotos;
