import React from 'react'
import icon from "./../../images/neutral-unscreen.gif"
import { useContextPublication } from '../../Context/contextPublication'
import "./CardPublicationLoading.css"

const CardPublicationLoading = () => {

    const {postsAvailableCategory,postsAvailablePlace} = useContextPublication()
  return (
    <div className='container-cardPublicationLoading'>

        <div className='cardPublicationLoading'>
        
          <div className='cardPublicationLoading-img'>
          <img src={icon} alt="icon" />
          </div>
          

          {postsAvailablePlace ? 
           <h2 className='cardPublicationLoading-span'>Lo sentimos no encontramos trabajos con <span>{postsAvailableCategory}</span> para <span> {postsAvailablePlace} </span> </h2>
           :
           <h2 className='cardPublicationLoading-span'>Lo sentimos no encontramos trabajos con <span>{postsAvailableCategory}</span> </h2>
        }
        </div>
        
       
    </div>
  )
}

export default CardPublicationLoading