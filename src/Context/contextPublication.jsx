import { createContext, useContext, useEffect, useState } from "react";
import { authContext, useAuth } from "./authContext";
import { onValue, push, set,ref,get, update } from "firebase/database";





import { auth,dbRealTime, storage,serverTimestamp } from "../Firebase";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { ref as storageRef } from "firebase/storage";
import CardPublication from "../Components/CardPublication/CardPublication";

export const contextPublication = createContext();

export const useContextPublication = () => {




  const contextPublicationUse = useContext(contextPublication);
  if (!contextPublicationUse)
    throw new Error("contextPublication is undefined");

  return contextPublicationUse;
};



export const PublicationProvider = ({ children }) => {


   const { userActive, nameState, imgProfile, numberPhoneState, skillsOne, skillsTwo, skillsThree, skillsFour, startsState,isUserOnline,frontPage } = useAuth();
 
   const [postsAvailable, setPostsAvailable] = useState([]);
   const [postsAvailableCategory, setPostsAvailableCategory]= useState(null);
   const [postsAvailablePlace , setPostsAvailablePlace ] = useState(null);
   

   
   const [imgPublication1,setImgPublication1]= useState(null);
   const [imgPublication2,setImgPublication2]= useState("");

   const [cantPublications, setCantPublications] = useState(0)
 
   const [getUserLike, setGetUserLike] = useState([])
   const [commentFocused, setCommentFocused] = useState(false);


   
 const [loadingImagen1, setLoadingImagen1] = useState(false)
 const [loadingImagen2, setLoadingImagen2] = useState(false)

   const uploadImageToStoragePublication1 = async (imagen1) => {
    try {
      const imageName = `image1_${userActive.uid}_${Date.now()}`;
      const storageReference = storageRef(storage, `imagesPublication/${userActive.uid}/${imageName}`);
      const snapshot = await uploadBytes(storageReference, imagen1);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error al cargar la imagen", error);
      throw error;
    }
  }
  

  
   const updateImgPublication1 =async(newImgProfile)=>{
       
      try{
        const imageUrl = await uploadImageToStoragePublication1(newImgProfile); 
        
    
      setImgPublication1(imageUrl)
      setLoadingImagen1(false)
      }catch(error){
         console.error("hubo un error en el codigo ", error);
      }
      
   }
   const uploadImageToStoragePublication2 = async (imagen2) => {
    try {
      const imageName = `image2_${userActive.uid}_${Date.now()}`;
      const storageReference = storageRef(storage, `imagesPublication2/${userActive.uid}/${imageName}`);
      const snapshot = await uploadBytes(storageReference, imagen2);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error al cargar la imagen", error);
      throw error;
    }
  }

  
const updateImgPublication2 = async (newImgProfile) => {
  try {
    const imageUrl = await uploadImageToStoragePublication2(newImgProfile);
  
    setImgPublication2(imageUrl);
    setLoadingImagen2(false)
  } catch (error) {
    console.error("Hubo un error en el código", error);
  }
};


/*Logicas del like*/


const addLikePublication = async (userDataLike, userId, publicationId) => {
  try {
    const userPostsRef = ref(dbRealTime, `posts/${userId}/${publicationId}/likes`);
    const userPublicationSnapshot = await get(userPostsRef);
    const userPublicationArray = userPublicationSnapshot.val() || [];

    // Nos aseguramos que si hay un nuevo like del mismo usuario no se agrege
    const exists = userPublicationArray.some((item) => item.idUser === userDataLike.idUser);

    if (!exists) {
      userPublicationArray.push(userDataLike);
      set(userPostsRef, userPublicationArray);
      return userPublicationArray; // Devuelve la lista actualizada de 'likes'
    }
  } catch (error) {
    console.error("Error en addLikePublication:", error);
  }
};

const deleteLikePublication = async (userId, publicationId, likeId) => {
  try {
    const userPostsRef = ref(dbRealTime, `posts/${userId}/${publicationId}/likes`);
    const likesSnapshot = await get(userPostsRef);
    let likesData = likesSnapshot.val() || [];

    // Encuentra el índice del like a eliminar
    const index = likesData.findIndex((like) => like.idUser === likeId);

    if (index !== -1) {
      // Elimina el like del array de likes
      likesData.splice(index, 1);
      // Actualiza los datos en la base de datos
      set(userPostsRef, likesData);
    }
  } catch (error) {
    console.error("Error al eliminar el like:", error);
  }
};


   const getLikesForPublication = async (userId, publicationId) => {
    try {
      const userPostsRef = ref(dbRealTime, `posts/${userId}/${publicationId}/likes`);
      const likesSnapshot = await get(userPostsRef);
      const likesData = likesSnapshot.val() || [];
  
   
   
      return likesData;
    } catch (error) {
      console.error("Error al obtener los datos de likes:", error);
      return [];
    }
  };



 
  { /*const getLikesCountForUser = async (userId) => {
    try {
      const userPostsRef = ref(dbRealTime, `posts/${userId}`);
      const userPostsSnapshot = await get(userPostsRef);
      const userPosts = userPostsSnapshot.val() || {};
  
      let totalLikes = 0;
  
      Object.keys(userPosts).forEach(async (publicationId) => {
        const likes = userPosts[publicationId].likes || [];
        totalLikes += likes.length;
      });
  
      return totalLikes;
    } catch (error) {
      console.error("Error al obtener los datos de publicaciones del usuario:", error);
      return 0; // Devuelve 0 si hay un error o si no hay publicaciones
    }
  };*/}
 
  
  const getLikesCountForUser = async (userId) => {
    try {
      const userPostsRef = ref(dbRealTime, `posts/${userId}`);
      const userPostsSnapshot = await get(userPostsRef);
      const userPosts = userPostsSnapshot.val() || {};
  
      let totalLikes = 0;
      const likedBy = []; // Array para almacenar la información de los usuarios que dieron like
  
      await Promise.all(
        Object.keys(userPosts).map(async (publicationId) => {
          const likes = userPosts[publicationId].likes || [];
          const hearts = userPosts[publicationId].hearts || [];
          const textPost = userPosts[publicationId].textPost || ''; // Obtén el texto de la publicación
  
          const interactions = likes
            .map(like => ({ ...like, interactionType: 'like', time: like.time }))
            .concat(
              hearts.map(heart => ({ ...heart, interactionType: 'heart', time: heart.time }))
            );
  
          interactions.forEach(interaction => {
            if (interaction.idUser !== userId) {
              totalLikes += 1;
              likedBy.push({
                idUser: interaction.idUser,
                nameUser: interaction.nameUser,
                imgUser: interaction.imgUser,
                idPublication: publicationId,
                interactionType: interaction.interactionType === 'like' ? '👍' : 'Guardado 💖',
                textPost: textPost,
                time: interaction.time // Asegúrate de que time esté presente en los objetos de interacción
              });
            }
          });
        })
      );
  
      // Ordenar likedBy por tiempo
      likedBy.sort((a, b) => a.time - b.time);
  
      return { totalLikes, likedBy };
    } catch (error) {
      console.error("Error al obtener los datos de publicaciones del usuario:", error);
      return { totalLikes: 0, likedBy: [] }; // Devuelve 0 si hay un error o si no hay publicaciones
    }
  };
  
  const getHeartAllUserData = async (userId) => {
    
    try {
      const usersPostsRef = ref(dbRealTime, `users/${userId}/heartAllUser`);
      const usersPostsSnapshot = await get(usersPostsRef);
      const usersPostsData = usersPostsSnapshot.val() || {};
  
  
  
      return usersPostsData;
    } catch (error) {
      console.error("Error al obtener los datos de heartAllUser:", error);
      return { heartAllUserCount: 0 }; // Devuelve 0 si hay un error o si no hay datos
    }
  };
  
/**/ 
/*Logica de Heart */

const addHeartPublication = async (userDataLike, userId, publicationId) => {
  try {
    const userPostsRef = ref(dbRealTime, `posts/${userId}/${publicationId}/hearts`);
    const userPublicationSnapshot = await get(userPostsRef);
    const userPublicationArray = userPublicationSnapshot.val() || [];

    // Nos aseguramos que si hay un nuevo like del mismo usuario no se agrege
    const exists = userPublicationArray.some((item) => item.idUser === userDataLike.idUser);

    if (!exists) {
      userPublicationArray.push(userDataLike);
      set(userPostsRef, userPublicationArray);
      return userPublicationArray; // Devuelve la lista actualizada de 'likes'
    }
  } catch (error) {
    console.error("Error en addLikePublication:", error);
  }
};



const addHeartAllPublication = async (idUser, userId, publicationId,img,name,text) => {
  try {
    const userActiveId = userActive.uid; // Obtener el id del usuario activo del componente

      // Verificar si el userDataLike es igual a userActiveId y llamar a la función addHeartToUser si es así
      if (idUser === userActiveId) {
      
        try {
          const usersPostsRef = ref(dbRealTime, `users/${idUser}`);
          
          const usersPostsSnapshot = await get(usersPostsRef);
          const usersPosts = usersPostsSnapshot.val() || {};
      
          const heartAllUser = usersPosts.heartAllUser || [];
      
          // Verificar si la publicación ya está en el array
          const exists = heartAllUser.some((item) => item.publicationId === publicationId);
      
          if (!exists) {
            const heartObj = { userCreator: userId, publicationIdCreator: publicationId,imgCreator:img,nameCreator:name,textCreator:text };
            const updatedHeartAllUser = [...heartAllUser, heartObj];
            await update(usersPostsRef, { heartAllUser: updatedHeartAllUser });
          }
        } catch (error) {
          console.error("Error en addHeartToUser:", error);
        }
      }


  } catch (error) {
    console.error("Error en addLikePublication:", error);
  }
};


const deleteHeartAllPublication = async (userId, publicationId) => {
  try {
    const usersPostsRef = ref(dbRealTime, `users/${userId}`);
    const usersPostsSnapshot = await get(usersPostsRef);
    const usersPosts = usersPostsSnapshot.val() || {};

    const heartAllUser = usersPosts.heartAllUser || [];

    // Filtrar el array heartAllUser para eliminar el elemento que tenga el publicationId específico
    const updatedHeartAllUser = heartAllUser.filter((item) => item.publicationIdCreator !== publicationId);

    // Actualizar el array heartAllUser en la base de datos
    await update(usersPostsRef, { heartAllUser: updatedHeartAllUser });
  } catch (error) {
    console.error("Error al eliminar la publicación de heartAllUser:", error);
  }
};




const deleteHeartPublication = async (userId, publicationId, likeId) => {
  try {
    const userPostsRef = ref(dbRealTime, `posts/${userId}/${publicationId}/hearts`);
    const likesSnapshot = await get(userPostsRef);
    let likesData = likesSnapshot.val() || [];

    // Encuentra el índice del like a eliminar
    const index = likesData.findIndex((like) => like.idUser === likeId);

    if (index !== -1) {
      // Elimina el like del array de likes
      likesData.splice(index, 1);
      // Actualiza los datos en la base de datos
      set(userPostsRef, likesData);
    }
  } catch (error) {
    console.error("Error al eliminar el like:", error);
  }
};


const getHeartForPublication = async (userId, publicationId) => {
  try {
    const userPostsRef = ref(dbRealTime, `posts/${userId}/${publicationId}/hearts`);
    const likesSnapshot = await get(userPostsRef);
    const heartData = likesSnapshot.val() || [];

    // Aquí puedes hacer algo con los datos de 'heartData', como actualizar el estado local, por ejemplo.

    
    return heartData;
    
  } catch (error) {
    console.error("Error al obtener los datos de likes:", error);
    return [];
  }
};


const getInformationAvailable = () => {
  

   const postsRef = ref(dbRealTime, "posts");
   const postsSnapshotCallback = (snapshot) => {
     const post = snapshot.val();
     if (post) {
       const postsArray = Object.values(post);
   
       
       setPostsAvailable(postsArray);
     }

    

     
   };
   onValue(postsRef, postsSnapshotCallback);
 };



  
   const getDataCreatePost = (postData) => {
    // Lógica para crear una nueva publicación
    const userId = userActive.uid; // Obtenemos el uid del usuario actual
    const createPostRef = ref(dbRealTime, `posts/${userId}`); // Usamos el uid como clave
    const newPostRef = push(createPostRef);
    const publicationId = newPostRef.key;
    // Inicializa el campo de likes como un array vacío para cada nueva publicación
    const newPost = {
      id: userId,
      idPubli:publicationId,
      img: imgProfile,
      imgFront: frontPage,
      likes: [], // Inicializa los likes como un array vacío
      hearts:[],
      name: nameState,
      starts: startsState,
      skills: [skillsOne, skillsTwo, skillsThree, skillsFour],
      numberPhone: numberPhoneState,
      createdTime: serverTimestamp(), // Aquí se está utilizando serverTimestamp
      img1: imgPublication1,
      img2: imgPublication2,
      textPost: postData.textPost,
      category: postData.category,
      occupation: postData.occupation,
      place: postData.place,
      rango1: postData.rango1,
      rango2: postData.rango2,
      needStudy : postData.needStudy,
      isOnline: isUserOnline, // Agrega el estado en línea del usuario a la publicación

    };
  
    set(newPostRef, newPost)
      .then(() => {
        console.log("Publicación creada exitosamente");
      })
      .catch((error) => {
        console.error("Error al crear la publicación:", error);
      });
  };
 
  return (
    <contextPublication.Provider value={{ getDataCreatePost,getInformationAvailable,postsAvailable,updateImgPublication1,imgPublication1,loadingImagen1,setLoadingImagen1,updateImgPublication2,imgPublication2,loadingImagen2,setLoadingImagen2,addLikePublication,getUserLike,getLikesForPublication,deleteLikePublication,getLikesCountForUser,addHeartPublication,deleteHeartPublication,getHeartForPublication,addHeartAllPublication ,deleteHeartAllPublication,getHeartAllUserData,
      setCantPublications,cantPublications,
 commentFocused, setCommentFocused,setPostsAvailableCategory,postsAvailableCategory,setPostsAvailablePlace,postsAvailablePlace,
    }}>
      {children}
    </contextPublication.Provider>
  );
};
