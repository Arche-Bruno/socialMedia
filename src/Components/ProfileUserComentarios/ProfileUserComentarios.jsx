import React, { useEffect, useRef, useState,useImperativeHandle  } from "react";
import "./ProfileUserComentarios.css";

import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";



/*Para los emoticones */
import EmojiPicker from "emoji-picker-react";

/*Para el acordion*/
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAuth } from "../../Context/authContext";
import { dbRealTime } from "../../Firebase";
import { get, onValue, ref } from "firebase/database";
import { Textarea } from "@nextui-org/react";

/*Para el mensaje de comentario subido */
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useContextPublication } from "../../Context/contextPublication";
import { Link } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProfileUserComentarios = ({ id, name }) => {
  const [open, setOpen] = useState(false);

  const [expanded, setExpanded] = useState(null);
  const [showShortBtns, setShowShortBtns] = useState(false);
  const [commentText, setCommentText] = useState("");

  const [expandedComments, setExpandedComments] = useState({});

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para controlar si se está 
  const [cantCommentsUser, setcantCommentsUser] = useState(null);

  const { userActive, updateUserComments } = useAuth();

  const handleExpand = (commentId) => (event, isExpanded) => {
    setExpandedComments((prevExpanded) => ({
      ...prevExpanded,
      [commentId]: isExpanded,
    }));
  };
  /*Para Dar focus al comentario*/

  const { commentFocused } = useContextPublication();
  const commentRef = useRef(null);

  useEffect(() => {
    if (commentFocused && commentRef.current) {
      commentRef.current.focus();
    }
  }, [commentFocused]);
  
/**/
  /*Para obtener los datos del usuario que envia mensaje */
  useEffect(() => {
    const getUserData = async () => {
      const userId = userActive.uid;
      const userRef = ref(dbRealTime, `users/${userId}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        setUserData(data);
      } else {
        console.log("No se encontro al usuario que esta intenta buscar");
      }
      setLoading(false);
    };
    getUserData(userData);
  }, []);
  
  useEffect(() => {
    const contCommentsRef = ref(dbRealTime, `users/${id}/contComments`);
    const getConComments = onValue(contCommentsRef, (snapshot) => {
      const currentConComments = snapshot.val() || [];
      setcantCommentsUser(currentConComments);
    });
    return () => {
      getConComments();
    };
  }, [id]);

  /*Para enviar un comentario*/

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
    setShowShortBtns(true);
  };
  /*Para el mensaje de comentario enviado */

  const [openCom, setOpenCom] = useState(false);

  const handleCloseCom = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenCom(false);
  };
  /**/
  const handleCommentSubmit = async () => {
    const newComment = {
      id: userActive.uid,
      author: userData.name,
      imgProfile: userData.profileImg,

      content: commentText,
    };
    // Enviar el nuevo comentario y los datos del usuario al backend
    updateUserComments(newComment, id);

    // Limpiar el cuadro de texto después de enviar el comentario
    setCommentText("");
    setShowShortBtns(false);
    setOpenCom(true);
  };

  /*Para los emojis */

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiClick = (event) => {
    if (event.emoji) {

    const emoji = event.emoji;
      setCommentText((prevText) => prevText + emoji); // Agregar emojiAlt al texto del comentario
    } else {
      console.log("Hubo un error");
      
    }
    setShowEmojiPicker(!showEmojiPicker);
  };
  /*Para dar poner en focus al comentario */
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);

  return (
    <div className="container-comentarios">
      
      {id ===userActive.uid ?  <> </> : 
       <div className="w-full grid grid-cols-12 gap-4 container-comments">

       <ListItemAvatar>
         <Avatar alt="User Avatar" src={userData?.profileImg} />
       </ListItemAvatar>
       

       <div className="container-comments-btns dark text-foreground">
         <Textarea
           variant="underlined"
           labelPlacement="outside"
           placeholder="Añade un comentario"
           className="col-span-12 md:col-span-5 mb-6 md:mb-0 textArea"
           value={commentText}
           onChange={handleCommentChange}
           style={{ height: "50px" }}
          ref={commentRef}
           />
        
        
         {/* Imprime el valor de commentText para verificar */}
         {showShortBtns ? (
           <div className="container-buttons">
             <button
               className={`buttons-comentar ${
                 commentText ? "" : "buttons-comentar-inhabilitado"
               }`}
               onClick={handleCommentSubmit}
               disabled={!commentText}
             >
              Comentar
             </button>

             <button className="buttons-cancela" onClick={handleCloseCom}>
               Cancelar
             </button>
             <div className="emoji-container">
               {showEmojiPicker ? (
                 <div className="emoji-picker">
                   <EmojiPicker onEmojiClick={handleEmojiClick} />
                   <button onClick={handleEmojiClick}>Cerrar</button>
                 </div>
               ) : (
                 <button onClick={handleEmojiClick}>🙂</button> // Agrega un botón con una carita para abrir el selector de emoji
               )}
             </div>
           </div>
         ) : (
           <button className="buttons-cancela-invi"></button>
         )}
       </div>

       <Snackbar
         open={openCom}
         autoHideDuration={5000}
         onClose={handleCloseCom}
       >
         <Alert
           onClose={handleCloseCom}
           severity="success"
           sx={{ width: "100%" }}
         >
           Comentario enviado!
         </Alert>
       </Snackbar>
     </div>
      }
     

      <div
        className="comentarios-content"
        style={{ height: "450px", overflowY: "auto" }}
      >
        {cantCommentsUser && cantCommentsUser.length ===0 ? 
      <div className="content0">
        Sin comentarios por ahora, se el primero en comentar 😁

      </div> :


  <>
  {cantCommentsUser?.map((comment, index) => (
          <Accordion
          key={`comment-${comment.id}-${index}`} // Utiliza una clave única que combina el ID del comentario con el índice
            expanded={expandedComments[`panel${index}`] || false}
            onChange={handleExpand(`panel${index}`)}
            sx={{
              bgcolor: "rgba(0, 0, 0, 0.6)",
              color: "white",
              marginBottom: "10px",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#aaaaa0" }} />}
              aria-controls={`panel${comment.id}a-content`}
              id={`panel${comment.id}a-header`}
            >
    
              <ListItemAvatar>
             
                <Avatar alt="User Avatar" src={comment.imgProfile} />
           
              </ListItemAvatar>
         
              <div>
              <Link to={`/ProfileUser/${comment.id}`}>
                <Typography
                className="author"
                  variant="subtitle1"
                  component="div"
                  sx={{ fontWeight: "bold", display: "inline", color: "white" }}
                >
                  {comment.author}
                </Typography>
                </Link>
                <Typography variant="body2" component="div" color="#aaaaa0">
                  {comment.content.length > 25
                    ? `${comment.content.substring(0, 25)}...`
                    : comment.content}
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{comment.content}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
  </>
       }
        
      </div>
    </div>
  );
};

export default ProfileUserComentarios;
