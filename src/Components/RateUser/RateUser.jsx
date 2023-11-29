import React from "react";
import "./Rate.css";
import CardRateUser from "../CardRateUser/CardRateUser";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useAuth } from "../../Context/authContext";
const RateUser = () => {
  const { imgProfile, nameState, getArrUserPublication } = useAuth();

  console.log(getArrUserPublication)
  return (
    <div className="container-rateUser">
      <div className="rateUser-info">
        
      
      </div>
    </div>
  );
};

export default RateUser;
