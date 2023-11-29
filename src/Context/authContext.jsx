import { createContext, useContext, useEffect, useState } from "react";
import { auth, dbRealTime } from "../Firebase";
import { v4 as uuidv4 } from "uuid";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import {
  get,
  onChildChanged,
  onValue,
  ref,
  set,
  child,
} from "firebase/database";
import { storage } from "../Firebase";
import { deleteObject, getDownloadURL, uploadBytes } from "firebase/storage";
import { ref as storageRef } from "firebase/storage";
import { push } from "firebase/database";

import imgProfileDocu from "./../images/anonimo.jpg";
import imgFrontPage from "./../images/front-pageCachueleate.png";
import { useContextPublication } from "./contextPublication";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("Context is undefined");
  return context;
};

// Exporta la función si necesitas usarla en otros archivos

export const AuthProvider = ({ children }) => {
  const [userActive, setUserActive] = useState(null);
  const [loading, setLoading] = useState(true);
  

  const [nameState, setNameState] = useState("user.cachueleate");
  const [numberPhoneState, setnumberPhoneState] = useState("xxx xxx xxx");
  const [typeState, setTypeState] = useState("");

  const [startsState, setStartsState] = useState(2.5);

  const [skillsOne, setSkillsOne] = useState("Habilidad 1");
  const [skillsTwo, setSkillsTwo] = useState("Habilidad 2");
  const [skillsThree, setSkillsThree] = useState("Habilidad 3");
  const [skillsFour, setSkillsFour] = useState("Habilidad 4");

  const [imgProfile, setImgProfile] = useState(imgProfileDocu);
  const [frontPage, setFrontPage] = useState(imgFrontPage);

  const [showProfile, setshowProfile] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);

  const [getArrUserPublication, setgetArrUserPublication] = useState([]);

  const [heartAll, setHeartAll] = useState([]);

  const [contWork, setContWork] = useState(1);

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingFront, setLoadingFront] = useState(false);

 
  const [isUserOnline, setIsUserOnline] = useState(false);
  /*******************************User update    *******************************/
  useEffect(() => {
    const onsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserActive(currentUser);
      setLoading(false);
    });

    return () => onsubscribe();
  }, []);

  useEffect(() => {
    if (userActive) {
      const onlineStatusRef = ref(dbRealTime, `users/${userActive.uid}/online`);

      const onlineStatusListener = onValue(onlineStatusRef, (snapshot) => {
        const isOnline = snapshot.val();
        setIsUserOnline(isOnline);
      });

      return () => {
        if (onlineStatusListener) {
          onlineStatusListener();
        }
      };
    }
  }, [userActive]);

  useEffect(() => {
    if (userActive) {
      const nameRef = ref(dbRealTime, `users/${userActive.uid}/name`);

      const changeName = onValue(nameRef, (snapshot) => {
        const changename = snapshot.val();

        setNameState(changename);
      });

      const workRef = ref(dbRealTime, `users/${userActive.uid}/contWorkUser`);

      const changeWork = onValue(workRef, (snapshot) => {
        const changework = snapshot.val();
        setContWork(changework);
      });

      const numberRef = ref(dbRealTime, `users/${userActive.uid}/numberPhone`);

      const changeNumber = onValue(numberRef, (snapshot) => {
        const changenumber = snapshot.val();
        setnumberPhoneState(changenumber || numberPhoneState);
      });
      const typeRef = ref(dbRealTime, `users/${userActive.uid}/type`);

      const changeType = onValue(typeRef, (snapshot) => {
        const changetype = snapshot.val();
        setTypeState(changetype || typeState);
      });

      const heartAllref = ref(
        dbRealTime,
        `users/${userActive.uid}/heartAllUser`
      );

      const changeHeartAll = onValue(heartAllref, (snapshot) => {
        const changeheartall = snapshot.val();
        setHeartAll(changeheartall || heartAll);
      });

      const startRef = ref(dbRealTime, `users/${userActive.uid}/starts`);

      const changeStart = onValue(startRef, (snapshot) => {
        const changestart = snapshot.val();

        setStartsState(changestart || startsState);
      });

      const imgProfileRef = ref(
        dbRealTime,
        `users/${userActive.uid}/profileImg`
      );
      const changeImgProfile = onValue(imgProfileRef, (snapshot) => {
        const changeimgProfile = snapshot.val();

        setImgProfile(changeimgProfile || imgProfileDocu);
      });

      const imgFrontPageRef = ref(
        dbRealTime,
        `users/${userActive.uid}/frontPage`
      );
      const changeImgFrontPage = onValue(imgFrontPageRef, (snapshot) => {
        const changeimgFrontPage = snapshot.val();

        setFrontPage(changeimgFrontPage || imgFrontPage);
      });

      const skillsOneRef = ref(dbRealTime, `users/${userActive.uid}/oneSkill`);
      const changeSkillOneRef = onValue(skillsOneRef, (snapshot) => {
        const changeskilloneref = snapshot.val();
        setSkillsOne(changeskilloneref || skillsOne);
      });

      const skillsTwoRef = ref(dbRealTime, `users/${userActive.uid}/twoSkill`);

      const changeSkillTwoRef = onValue(skillsTwoRef, (snapshot) => {
        const changeskilltworef = snapshot.val();

        setSkillsTwo(changeskilltworef || skillsTwo);
      });

      const skillsThreeRef = ref(
        dbRealTime,
        `users/${userActive.uid}/threeSkill`
      );

      const changeSkillThreeRef = onValue(skillsThreeRef, (snapshot) => {
        const changeskillthreeref = snapshot.val();
        setSkillsThree(changeskillthreeref || skillsThree);
      });

      const skillsFourRef = ref(
        dbRealTime,
        `users/${userActive.uid}/fourSkill`
      );

      const changeSkillFourRef = onValue(skillsFourRef, (snapshot) => {
        const changeskillfourref = snapshot.val();

        setSkillsFour(changeskillfourref || skillsFour);
      });

      const userPublication = ref(
        dbRealTime,
        `users/${userActive.uid}/arrUsers`
      );

      const changeUserPublication = onValue(userPublication, (snapshot) => {
        const changeuserPubication = snapshot.val();

        setgetArrUserPublication(changeuserPubication, getArrUserPublication);
      });

      return () => {
        changeName();
        changeNumber();
        changeType();
        changeWork();

        changeHeartAll();

        changeStart();
        changeImgProfile();
        changeImgFrontPage();

        changeSkillOneRef();
        changeSkillTwoRef();
        changeSkillThreeRef();
        changeSkillFourRef();

        changeUserPublication();
      };
    }
  }, [userActive]);

  const closedShowProfile = () => {
    setshowProfile(false);
  };

  const ChangeProfile = () => {
    setshowProfile(true);
  };

  /////////////////////////////////

  const handlePublication = () => {
    setShowCreatePost(true);
  };
  const handleShowPostClosed = () => {
    setShowCreatePost(false);
  };

  const setUserOnlineStatus = (userId, isOnline) => {
    const onlineStatusRef = ref(dbRealTime, `users/${userId}/online`);
    set(onlineStatusRef, isOnline);

    const userPostsRef = ref(dbRealTime, `posts/${userId}`);

    onValue(userPostsRef, (snapshot) => {
      if (snapshot.exists()) {
        const userPosts = snapshot.val();
        Object.keys(userPosts).forEach((postId) => {
          const posts = userPosts[postId];
          const postsNumberRef = ref(
            dbRealTime,
            `posts/${userId}/${postId}/isOnline`
          );

          set(postsNumberRef, isOnline);
        });
      }
    });
  };

  const updateName = async (name) => {
    try {
      // Si 'name' es undefined, utiliza un valor predeterminado
      name = name || "user.cachueleate";
      const nameRef = ref(dbRealTime, `users/${userActive.uid}/name`);
      await set(nameRef, name);

      // Luego, actualiza el nombre en las publicaciones del usuario
      const userPostsRef = ref(dbRealTime, `posts/${userActive.uid}`);
      onValue(userPostsRef, (snapshot) => {
        if (snapshot.exists()) {
          const userPosts = snapshot.val();
          // Itera a través de las publicaciones del usuario y actualiza el nombre en cada una
          Object.keys(userPosts).forEach((postId) => {
            const post = userPosts[postId];
            const postNameRef = ref(
              dbRealTime,
              `posts/${userActive.uid}/${postId}/name`
            );
            set(postNameRef, name);
          });
        }
      });

      // Actualiza el nombre en contComments y heartAllUser de todos los usuarios
const allUsersRef = ref(dbRealTime, 'users');


onValue(allUsersRef, (snapshot) => {
  if (snapshot.exists()) {
    const allUsers = snapshot.val();
    Object.keys(allUsers).forEach((userId) => {
      const user = allUsers[userId];
      if (user.arrUsers) {
        user.arrUsers.forEach((arrUser, index) => {
          if (arrUser.id === userActive.uid) {
            const arrUserNameRef = ref(dbRealTime, `users/${userId}/arrUsers/${index}/name`);
            set(arrUserNameRef, name);
          }
        });
      }
      if (user.contComments) {
        user.contComments.forEach((comment, index) => {
          if (comment.id === userActive.uid) {
            const commentNameRef = ref(dbRealTime, `users/${userId}/contComments/${index}/author`);
            set(commentNameRef, name);
          }
        });
      }
      if (user.heartAllUser) {
        user.heartAllUser.forEach((heart, index) => {
          if (heart.userCreator === userActive.uid) {
            const heartNameCreatorRef = ref(dbRealTime, `users/${userId}/heartAllUser/${index}/nameCreator`);
            set(heartNameCreatorRef, name);
          }
        });
      }
    });
  }

});

const allPostsRef = ref(dbRealTime, `posts`);
onValue(allPostsRef, (snapshot) => {
  if (snapshot.exists()) {
    const allPosts = snapshot.val();

    Object.keys(allPosts).forEach((userId) => {
      const userPosts = allPosts[userId];
      Object.keys(userPosts).forEach((postId) => {
        const post = userPosts[postId];

        // Verificar si el usuario dio "like" en la publicación y actualizar la información del usuario en la publicación
        if (post.likes) {
          post.likes.forEach((like, index) => {
            if (like.idUser === userActive.uid) {
              const postNameUserRef = ref(dbRealTime, `posts/${userId}/${postId}/likes/${index}/nameUser`);
              set(postNameUserRef, name);
            }
          });
        }

        // Verificar si el usuario dio "heart" en la publicación y actualizar la información del usuario en la publicación
        if (post.hearts) {
          post.hearts.forEach((heart, index) => {
            if (heart.idUser === userActive.uid) {
              const postNameUserRef = ref(dbRealTime, `posts/${userId}/${postId}/hearts/${index}/nameUser`);
              set(postNameUserRef, name);
            }
          });
        }
      });
    });
  }
});


    } catch (error) {
      console.error(error);
    }
  };


  const updateNumber = async (number) => {
    console.log(number);

    try {
      number = number || 0;
      const numberRef = ref(dbRealTime, `users/${userActive.uid}/numberPhone`);
      await set(numberRef, number);

      const userPostsRef = ref(dbRealTime, `posts/${userActive.uid}`);
      onValue(userPostsRef, (snapshot) => {
        if (snapshot.exists()) {
          const userPosts = snapshot.val();
          Object.keys(userPosts).forEach((postId) => {
            const posts = userPosts[postId];
            const postsNumberRef = ref(
              dbRealTime,
              `posts/${userActive.uid}/${postId}/numberPhone`
            );

            set(postsNumberRef, number);
          });
        }
      });
    } catch (error) {
      console.error(
        "no se pudo actualizar en numero de celular error : " + error
      );
    }
  };

  const updateUserComments = async (newComment, id) => {
    try {
      const userCommentsRef = ref(dbRealTime, `users/${id}/contComments`);

      // Obtén los comentarios actuales del usuario
      const userCommentsSnapshot = await get(userCommentsRef);
      let currentComments = userCommentsSnapshot.val() || [];

      // Agrega el nuevo comentario a la lista de comentarios actuales
      currentComments.push(newComment);

      // Actualiza los comentarios en la base de datos
      await set(userCommentsRef, currentComments);

      console.log("Comentario agregado con éxito.");
    } catch (error) {
      console.error(
        "Error al intentar actualizar el comentario del usuario:",
        error
      );
    }
  };

  const updatetype = async (type) => {
    try {
      type = type || "";
      const typeRef = ref(dbRealTime, `users/${userActive.uid}/type`);
      await set(typeRef, type);

      const userPostsRef = ref(dbRealTime, `posts/${userActive.uid}`);
      onValue(userPostsRef, (snapshot) => {
        if (snapshot.exists()) {
          const userPosts = snapshot.val();
          Object.keys(userPosts).forEach((postId) => {
            const posts = userPosts[postId];
            const postsNumberRef = ref(
              dbRealTime,
              `posts/${userActive.uid}/${postId}/type`
            );

            set(postsNumberRef, type);
          });
        }
      });
    } catch (error) {
      console.error(
        "no se pudo actualizar en numero de celular error : " + error
      );
    }
  };

  const addPublicationToUser = async (publicationData) => {
    try {
      if (userActive) {
        const userId = userActive.uid;
        const userPublicationRef = ref(dbRealTime, `users/${userId}/arrUsers`);

        // Obten el arreglo actual de publicaciones del usuario
        const userPublicationSnapshot = await get(userPublicationRef);
        const userPublicationArray = userPublicationSnapshot.val() || [];

        // Verifica si la publicación ya existe en el arreglo
        const publicationExists = userPublicationArray.some(
          (publication) => publication.id === publicationData.id
        );

        if (!publicationExists) {
          // Agrega la nueva publicación al arreglo
          userPublicationArray.push(publicationData);

          // Actualiza el arreglo en la base de datos
          await set(userPublicationRef, userPublicationArray);
        } else {
          console.log("La publicación ya existe en el arreglo del usuario.");
          // Puedes manejar esto como desees, por ejemplo, mostrar un mensaje de error.
        }
      }
    } catch (error) {
      console.error("Error al agregar publicación al usuario:", error);
    }
  };

  const updateStart = async (start, id) => {
    try {
      console.log("verificando en el context", start);
      const startRef = ref(dbRealTime, `users/${id}/starts`);

      await set(startRef, start);

      const userPostsRef = ref(dbRealTime, `posts/${id}`);

      onValue(userPostsRef, (snapshot) => {
        if (snapshot.exists()) {
          const userPosts = snapshot.val();
          Object.keys(userPosts).forEach((postId) => {
            const posts = userPosts[postId];
            const postsStartRef = ref(
              dbRealTime,
              `posts/${id}/${postId}/starts`
            );

            set(postsStartRef, start);
          });
        }
      });
    } catch (error) {
      console.error("no se pudo actualizar las estrellas error : " + error);
    }
  };
  
  const updateContWorkUser = async (cont, id) => {
    console.log(cont + " del usuario " + id);

    try {
      const newContWork = cont + 1;
      const contWorkUserRef = ref(dbRealTime, `users/${id}/contWorkUser`);
      await set(contWorkUserRef, newContWork);

      setContWork(newContWork); // Actualiza el valor de contWork en el contexto
    } catch (error) {
      console.error("El error parece estar en la línea ", error);
    }
  };

  const updateSkill = async (skillOne, skillTwo, skillThree, skillFour) => {
    try {
      const skillsOneRef = ref(dbRealTime, `users/${userActive.uid}/oneSkill`);

      await set(skillsOneRef, skillOne);

      const skillsTwoRef = ref(dbRealTime, `users/${userActive.uid}/twoSkill`);

      await set(skillsTwoRef, skillTwo);

      const skillsThreeRef = ref(
        dbRealTime,
        `users/${userActive.uid}/threeSkill`
      );

      await set(skillsThreeRef, skillThree);

      const skillsFourRef = ref(
        dbRealTime,
        `users/${userActive.uid}/fourSkill`
      );

      await set(skillsFourRef, skillFour);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImageToStorage = async (imageFile) => {
    try {
      // Genera una referencia única para la imagen en Firebase Storage
      const storageReference = storageRef(
        storage,
        `profileImages/${userActive.uid}`
      );

      // Sube la imagen al almacenamiento
      const snapshot = await uploadBytes(storageReference, imageFile);

      // Obtiene la URL de descarga de la imagen
      const downloadURL = await getDownloadURL(snapshot.ref);

      return downloadURL;
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
      throw error;
    }
  };
 
const updateImgProfile = async (newImgProfile) => {
  try {
    const imageUrl = await uploadImageToStorage(newImgProfile);

    const databaseRef = ref(dbRealTime, `users/${userActive.uid}/profileImg`);

    // Actualizar la imagen de perfil en el perfil del usuario
    await set(databaseRef, imageUrl);
    setLoadingProfile(false);

    // Actualizar la imagen de perfil en todas las publicaciones del usuario
    const userPostsRef = ref(dbRealTime, `posts/${userActive.uid}`);
    onValue(userPostsRef, (snapshot) => {
      if (snapshot.exists()) {
        const userPosts = snapshot.val();

        // Actualizar la imagen de perfil en todas las publicaciones del usuario
        Object.keys(userPosts).forEach((postId) => {
          const post = userPosts[postId];

          const postImgRef = ref(
            dbRealTime,
            `posts/${userActive.uid}/${postId}/img`
          );
          set(postImgRef, imageUrl);
        });
      }
    });
    
    const allPostsRef = ref(dbRealTime, `posts`);
    onValue(allPostsRef, (snapshot) => {
      if (snapshot.exists()) {
        const allPosts = snapshot.val();
    
        Object.keys(allPosts).forEach((userId) => {
          const userPosts = allPosts[userId];
          Object.keys(userPosts).forEach((postId) => {
            const post = userPosts[postId];
    
            // Verificar si el usuario dio "like" en la publicación y actualizar la información del usuario en la publicación
            if (post.likes) {
              post.likes.forEach((like, index) => {
                if (like.idUser === userActive.uid) {
                  const postImgUserRef = ref(dbRealTime, `posts/${userId}/${postId}/likes/${index}/imgUser`);
                  set(postImgUserRef, imageUrl);
                }
              });
            }
    
            // Verificar si el usuario dio "heart" en la publicación y actualizar la información del usuario en la publicación
            if (post.hearts) {
              post.hearts.forEach((heart, index) => {
                if (heart.idUser === userActive.uid) {
                  const postImgUserRef = ref(dbRealTime, `posts/${userId}/${postId}/hearts/${index}/imgUser`);
                  set(postImgUserRef, imageUrl);
                }
              });
            }
          });
        });
      } 
    });
          // Actualizar la imagen de perfil en contComments y heartAllUser de todos los usuarios
          const allUsersRef = ref(dbRealTime, 'users');
          onValue(allUsersRef, (snapshot) => {
            if (snapshot.exists()) {
              const allUsers = snapshot.val();
              Object.keys(allUsers).forEach((userId) => {
                const user = allUsers[userId];
                if (user.arrUsers) {
                  user.arrUsers.forEach((arrUser, index) => {
                    if (arrUser.id === userActive.uid) {
                      const arrUserImgRef = ref(dbRealTime, `users/${userId}/arrUsers/${index}/img`);
                      set(arrUserImgRef, imageUrl);
                    }
                  });
                }
                if (user.contComments) {
                  user.contComments.forEach((comment, index) => {
                    if (comment.id === userActive.uid) {
                      const commentImgProfileRef = ref(dbRealTime, `users/${userId}/contComments/${index}/imgProfile`);
                      set(commentImgProfileRef, imageUrl);
                    }
                  });
                }
                if (user.heartAllUser) {
                  user.heartAllUser.forEach((heart, index) => {
                    if (heart.userCreator === userActive.uid) {
                      const heartImgCreatorRef = ref(dbRealTime, `users/${userId}/heartAllUser/${index}/imgCreator`);
                      set(heartImgCreatorRef, imageUrl);
                    }
                  });
                }
              });
            }
          });
    
    console.log(
      "Imagen de perfil actualizada con éxito en todas las ubicaciones relevantes. "
    );
  } catch (error) {
    console.error("Error al actualizar la imagen de perfil:", error);
  }
};
  
  const uploadImageToStorageFront = async (imageFile) => {
    try {
      // Define la ruta de almacenamiento basada en el tipo de imagen (perfil o portada )

      // Genera una referencia única para la imagen en Firebase Storage
      const storageReference = storageRef(
        storage,
        `frontimgsprofile/${userActive.uid}`
      );

      // Sube la imagen al almacenamiento
      const snapshot = await uploadBytes(storageReference, imageFile);

      // Obtiene la URL de descarga de la imagen
      const downloadURL = await getDownloadURL(snapshot.ref);

      return downloadURL;
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
      throw error;
    }
  };

     {/* const userPostsRef = ref(dbRealTime, `posts/${userActive.uid}`);
      onValue(userPostsRef, (snapshot) => {
        if (snapshot.exists()) {
          const userPosts = snapshot.val();

          Object.keys(userPosts).forEach((postId) => {
            const post = userPosts[postId];

            const postImgRef = ref(
              dbRealTime,
              `posts/${userActive.uid}/${postId}/imgFront`
            );
            set(postImgRef, newImgFrontPage);
          });
        }
      });*/}
      const updateImgFrontPage = async (newImgFrontPage) => {
        try {
          const imgUrl = await uploadImageToStorageFront(newImgFrontPage);
    
          const databaseRef = ref(dbRealTime, `users/${userActive.uid}/frontPage`);
    
          await set(databaseRef, imgUrl);
    
          const userPostsRef = ref(dbRealTime, `posts/${userActive.uid}`);
        onValue(userPostsRef, (snapshot) => {
          if (snapshot.exists()) {
            const userPosts = snapshot.val();
            Object.keys(userPosts).forEach((postId) => {
              const postImgFrontRef = ref(
                dbRealTime,
                `posts/${userActive.uid}/${postId}/imgFront`
              );
              set(postImgFrontRef, imgUrl);
            });
          }
        });
          setLoadingFront(false);
    
    
     
    
          console.log("Imagen de perfil actualizada con éxito.");
        } catch (error) {
          console.error("Erro al actualizar la imagen de perfil : ", error);
        }
      };
      
  const uploadImageToStorageFrontUser = async (imageFile, userId) => {
    try {
      const uniqueId = uuidv4();
      const filename = `${userId}-${uniqueId}`;
      const storageReference = storageRef(
        storage,
        `imagesProfileUser/${userId}/${filename}`
      );
      const snapshot = await uploadBytes(storageReference, imageFile);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
      throw error;
    }
  };
  
  const deleteImage = async (userId, imgId) => {
    try {
      const userRef = ref(dbRealTime, `users/${userId}/contImages`);
      const contImagesSnapshot = await get(userRef);
      let contImages = contImagesSnapshot.val() || [];
      const filteredImages = contImages.filter((img) => img.id !== imgId); // Filtrar por ID de imagen
      await set(userRef, filteredImages);

      console.log("Imagen eliminada con éxito.");
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
    }
  };


  const updateImgProfileUser = async (imgFile, id) => {
    try {
      const imageUrl = await uploadImageToStorageFrontUser(imgFile, id);
      const userRef = ref(dbRealTime, `users/${id}`);
      // Obtén la referencia actual de contImages
      const contImagesRef = child(userRef, 'contImages');
      // Obtiene el valor actual de contImages
      const contImagesSnapshot = await get(contImagesRef);
      // Obtén el valor actual del arreglo
      let contImages = contImagesSnapshot.val() || [];
      // Genera un ID único para la imagen
      const imageId = uuidv4();
      // Agrega la nueva imagen al arreglo con su ID único
      contImages.push({ id: imageId, url: imageUrl });
      // Actualiza la base de datos con el nuevo arreglo
      await set(contImagesRef, contImages);
    } catch (error) {
      console.error('Error al actualizar la imagen de perfil del usuario:', error);
    }
  };
  
  const removePublicationFromUser = async (publicationId) => {
    try {
      if (userActive) {
        const userId = userActive.uid;
        const userPublicationRef = ref(dbRealTime, `users/${userId}/arrUsers`);

        // Obtén el arreglo actual de publicaciones del usuario
        const userPublicationSnapshot = await get(userPublicationRef);
        const userPublicationArray = userPublicationSnapshot.val() || [];

        // Encuentra y elimina la publicación con el ID específico
        const updatedPublicationArray = userPublicationArray.filter(
          (publication) => publication.id !== publicationId
        );

        // Actualiza el arreglo en la base de datos
        await set(userPublicationRef, updatedPublicationArray);
      }
    } catch (error) {
      console.error("Error al eliminar la publicación del usuario:", error);
    }
  };

  /************************************************************************************** */
  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();

    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      const userId = user.uid;
      const email = user.email;
      const displayName = user.displayName;
      const imgProfile = imgProfileDocu;
      const pageFront = imgFrontPage;
      const start = 2.5;

      const arrUser = getArrUserPublication;
      const heartAllUser = heartAll;

      const userRef = ref(dbRealTime, `users/${userId}`);

      // Verificar si el usuario ya existe en la base de datos
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        // El usuario no existe, guardar los datos públicos
        const userData = {
          heartAllUser,
          email: email,
          starts: start,
          numberPhone: "xxx xxx xxx",
          type: "",

          name: displayName,
          profileImg: imgProfile,
          frontPage: pageFront,
          arrUsers: arrUser,

          contWorkUser: 0,
          contComments: [],
          contImages: [],
        };

        await set(userRef, userData);
      }

      // Establecer el estado en línea del usuario en true
      setUserOnlineStatus(userId, true);
      // Actualizar el estado del usuario en el contexto
     
      setUserActive(user);
    } catch (error) {
      console.error("Error al iniciar sesión con Google", error);
    }
  };
 
  const register = async (email, password) => {

    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        const userId = userCredential.user.uid;
        const email = userCredential.user.email;
        const displayName = userCredential.user.displayName;
        const userRef = ref(dbRealTime, `users/${userId}`);
        const imgProfile = imgProfileDocu;
        const pageFront = imgFrontPage;
        const phoneNumber = "xxx xxx xxx";
        const start = 2.5;
        const arrUser = getArrUserPublication;

        const skillOne = "Hablidad 1";
        const skillTwo = "Habilidad 2";
        const skillThree = "Habilidad 3";
        const skillFour = "Habilidad 4";
        const heartAllUser = heartAll;
        // Verificar si el usuario ya existe en la base de datos
        get(userRef)
          .then((snapshot) => {
            if (!snapshot.exists()) {
              // El usuario no existe, guardar los datos
              const userData = {
                email: email,
                starts: start,
                numberPhone: phoneNumber,
                arrUsers: arrUser,
                heartAllUser,
                name: displayName,
                profileImg: imgProfile,
                frontPage: pageFront,

                oneSkill: skillOne,
                twoSkill: skillTwo,
                threeSkill: skillThree,
                fourSkill: skillFour,

                type: "",
                contWorkUser: 0,
                contComments: [],
                contImages: [],
              };

              set(userRef, userData);
            }
            // Establecer el estado en línea del usuario en true
            setUserOnlineStatus(userId, true);
            // Actualizar el estado del usuario en el contexto
            setUserActive(user);
          })
          .catch((error) => {
            if (error.code === "auth/invalid-email") {
              Swal.fire({
                icon: "error",
                title: "Ups! 😕",
                text: "Ingrese un Gmail o Hotmail valido",
                footer: '<a href="">Cachueleate esta esperando por ti!!</a>',
              });
            }
            if (error.code === "auth/weak-password") {
              Swal.fire({
                icon: "error",
                title: "Ups! 😕",
                text: "Ingrese una contraseña superior a 6 caracteres",
                footer: '<a href="">Es por la seguridad de tu cuenta!</a>',
              });
            }
            if (error.code === "auth/email-already-in-use") {
              Swal.fire({
                title: "<strong>Correo en uso 😟</strong>",
                icon: "info",
                html: "Intenta con otro correo <b>correo o gmail</b> ",
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: '<i class="fa fa-thumbs-up"></i> Ok!',
                confirmButtonAriaLabel: "Thumbs up, great!",
              });
            }
            if (error.code === "auth/missing-password") {
              Swal.fire({
                icon: "error",
                title: "Ups! 😕",
                text: "Te olvidas de escribir una contraseña",
                footer: '<a href="">Cosas que pasan, relax!</a>',
              });
            }
          });
      }
    );
  };

  const signUp = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signOutAccount = () => signOut(auth);

  const resetPasswordAndEmail = (email) => {
    sendPasswordResetEmail(auth, email);
  };

  const updateProfileAccount = (nameup = "user.cachueleate") => {
    updateProfile(auth.currentUser, {
      displayName: nameup,
     
    });
   
    console.log(nameup)


  };

  console.log(updateProfileAccount())
  return (
    <authContext.Provider
      value={{
        closedShowProfile,
        ChangeProfile,
        showProfile,

        handlePublication,
        handleShowPostClosed,
        showCreatePost,

        signUp,
        register,
        signOutAccount,
        userActive,
        isUserOnline,
        setUserOnlineStatus,
        setUserActive,
        setLoading,
        loading,
        loginWithGoogle,
        resetPasswordAndEmail,
        updateProfileAccount,

        updateUserComments,

        updateName,
        nameState,
        updateImgProfile,
        imgProfile: imgProfileDocu,
        imgProfile,
        loadingProfile,
        setLoadingProfile,
        updateImgFrontPage,
        setLoadingFront,
        loadingFront,
        frontPage: imgFrontPage,
        frontPage,
        updateImgProfileUser,
        deleteImage,
        updateNumber,
        numberPhoneState,
        updateContWorkUser,
        setContWork,
        contWork,

        updatetype,
        typeState,

        updateStart,
        startsState,

        updateSkill,

        skillsOne,
        skillsTwo,
        skillsThree,
        skillsFour,

        addPublicationToUser,

        removePublicationFromUser,
        getArrUserPublication,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
