import React, { useEffect, useState } from 'react'
import { useContextPublication } from '../../Context/contextPublication';
import CardPublication from '../CardPublication/CardPublication';

const ProfileUserPublicaciones = ({id}) => {

    const {
        postsAvailable,
        setCantPublications,
      } = useContextPublication();

   
      const [userPostCount, setUserPostCount] = useState(0);
      // Filtrar las publicaciones por el ID del usuario
      const userPosts = postsAvailable.filter(post =>
        Object.values(post).some(data => data.id === id)
      );
 
      useEffect(() => {
        if (userPosts.length > 0) {
          const userPostsCount = Object.keys(userPosts[0]).length;
          setUserPostCount(userPostsCount);
          setCantPublications(userPostsCount)
        }
       
      }, [userPosts]);
    
    
      

      
  return (
    <div>
<div>
    {userPosts.map((post, index) => (
      <div key={index} className="container-home-publications">
        {Object.values(post).map((data, dataKey) => (
          <div className="publication" key={dataKey}>
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
              img1={data.img1} // Pasa la URL de la primera imagen
              img2={data.img2} // Pasa la URL de la segunda imagen
              start={data.starts}
              online={data.isOnline}
              time={data.createdTime}
              like={data.likes}
              placeUser={data.place}
            />
          </div>
        ))}
      </div>
    ))}

  </div>
  </div>




  )
}

export default ProfileUserPublicaciones