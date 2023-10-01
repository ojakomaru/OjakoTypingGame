import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { type TypingDataType } from "../@types/ModuleTypes";

type HomeDisplayProps = {
  displayData: TypingDataType;
}

const HomeDisplay = ({ displayData }: HomeDisplayProps) => {
  const { title, problems } = displayData;
  const navigate = useNavigate();
  const GameStart = () => {
    navigate("/play");
  };
  // HTML
  return (
    <Grid container justifyContent="center" sx={{ mb: 2, pb: 2 }}>
      <Box
        sx={{
          position: "relative",
          mb: 2,
          p: 2,
          pr: { md: 0 },
          pb: 0,
          textAlign: "center",
        }}
      >
        <Typography variant="h3" color="inherit" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" color="inherit" paragraph>
          {problems[0].text}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          onClick={GameStart}
          variant="contained"
          size="large"
          color="primary"
        >
          Start
        </Button>
        <Button variant="contained" size="large" color="success">
          Setting
        </Button>
      </Box>
    </Grid>
  );
};
export default HomeDisplay;
