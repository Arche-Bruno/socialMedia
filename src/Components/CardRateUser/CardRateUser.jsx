import React, { useEffect, useState } from "react";
import "./CardRateUser.css";

import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useAuth } from "../../Context/authContext";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { onValue, ref, set } from "firebase/database";
import { dbRealTime } from "../../Firebase";



const CardRateUser = ({ name, start, imgProfile, id, hourUser }) => {
  const { updateStart, removePublicationFromUser,} = useAuth();


  const labels = {
    0.5: "Insatisfecho",
    1: "Insatisfecho+",
    1.5: "Deficiente ",
    2: "Deficiente+",
    2.5: "Regular",
    3: "Regular+",
    3.5: "Bueno",
    4: "Bueno+",
    4.5: "Excelente",
    5: "Excelente+",
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  const [value, setValue] = useState(0);

  const [contWork, setContWork] = useState(0);

useEffect(() => {
  const contWorkUserRef = ref(dbRealTime, `users/${id}/contWorkUser`);

  const getContWork = onValue(contWorkUserRef, (snapshot) => {
    const currentContWork = snapshot.val() || 0;
    setContWork(currentContWork);
  });

  return () => {
    getContWork();
  };
}, [id]);



const handleStart = async (newValue) => {
  try {
    if (newValue > start) {
      await updateStart(start + 0.5, id);
    } else {
      await updateStart(start - 0.5, id);
    }

    // Incrementar el valor de contWorkUser
    const newContWork = contWork + 1;

    // Actualizar el valor en la base de datos
    await set(ref(dbRealTime, `users/${id}/contWorkUser`), newContWork);

    // Actualizar el estado local de contWork
    setContWork(newContWork);

    await removePublicationFromUser(id);

    window.location.reload();
  } catch (error) {
    console.error("Ocurrió un error durante el proceso: ", error);
  }
};

  const [hover, setHover] = useState(-1);
  return (
    <div className="container-cardRateUser">
      
      <List
        sx={{
          width: "100%",
          color: "white",
          maxWidth: 360,
        }}
      >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={imgProfile} />
          </ListItemAvatar>

          <div>
            <ListItemText
              primary={
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ fontSize: "0.9rem" }}
                >
                  {name}
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  ></Typography>
                </React.Fragment>
              }
            />

            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
              }}
              className="starts"
            >
              <Rating
                name="hover-feedback"
                className="cardPubli-starts"
                value={start}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={async (event, newValue) => {
                  setValue(newValue);
                  handleStart(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
              )}
            </Box>
          </div>
        </ListItem>
        <div className="cardRateUser">{hourUser}</div>
        <Divider
          variant="inset"
          component="li"
          sx={{
            borderColor: "white",
          }}
        />
      </List>
    </div>
  );
};

export default CardRateUser;
