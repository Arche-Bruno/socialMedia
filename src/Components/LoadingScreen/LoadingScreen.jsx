import React from 'react';
import "./LoadingScreen.css";
import logo from "./../../images/newLogo.png";
import logoGif from  "./../../images/logoGif3.gif";
import videoLogo from "./../../images/videoLogo2.webm";
import { Box, CircularProgress } from '@mui/material';

const LoadingScreen = () => {
  return (
    <div className='containerLoadingScreen'>
      <div className='loading-screenContent'>
        <div className='loading-screenImage'>
        {/* <img src={logo} alt="Logo Cachueleate" /> */}
        <video autoPlay loop muted>
            <source src={videoLogo} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className='loading-screenLoader'>
          <Box sx={{ display: "flex", justifyContent: "center",marginTop:"4rem" , alignItems: "center", height: "100%" }}>
            <CircularProgress />
          </Box>
        </div>
      </div>

      <span className='containerLoadingScreen-span'>
        Cachueleate.com
      </span>

     
    </div>
  );
};

export default LoadingScreen;