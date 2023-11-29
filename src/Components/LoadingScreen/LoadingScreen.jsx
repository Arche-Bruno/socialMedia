import React from 'react';
import "./LoadingScreen.css";
import logo from "./../../images/newLogo.png";
import { Box, CircularProgress } from '@mui/material';

const LoadingScreen = () => {
  return (
    <div className='containerLoadingScreen'>
      <div className='loading-screenContent'>
        <div className='loading-screenImage'>
          <img src={logo} alt="Logo Cachueleate" />
        </div>
        <div className='loading-screenLoader'>
          <Box sx={{ display: "flex", justifyContent: "center",marginTop:"4rem" , alignItems: "center", height: "100%" }}>
            <CircularProgress />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;