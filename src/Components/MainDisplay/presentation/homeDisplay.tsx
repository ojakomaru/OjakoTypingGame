import React, { useCallback } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { type TypingDataType } from "../../../@types";
import { strTo3Leader } from "../../../Hooks";
import { TypeAnimation } from "react-type-animation";

type HomeDisplayProps = {
  displayData: TypingDataType;
};

const HomeDisplay = ({ displayData }: HomeDisplayProps) => {
  const { title, problems } = displayData;
  const navigate = useNavigate();
  const gameStart = useCallback(() => {
    navigate("/play", { state: displayData });
  }, [displayData, navigate]);
  const settingShow = useCallback(() => {
    navigate("/settings", { state: displayData });
  }, [displayData, navigate]);

  return (
    <Grid
      container
      justifyContent="center"
      sx={{
        mb: 2,
        pb: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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
          {strTo3Leader(problems[0].text, 40)}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          onClick={gameStart}
          variant="contained"
          size="large"
          color="primary"
        >
          Start
        </Button>
        <Button
          onClick={settingShow}
          variant="contained"
          size="large"
          color="success"
        >
          Setting
        </Button>
      </Box>
    </Grid>
  );
};
export default HomeDisplay;
