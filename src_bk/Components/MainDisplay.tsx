import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Container, rgbToHex } from "@mui/material";
import { MainFeaturedPostProps } from "../@types/ModuleTypes";

export default function MainDisplay() {
  return (
    <Container maxWidth="md">
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "grey.800",
          color: "#fff",
          mb: 2,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,.3)",
          }}
        />
      </Paper>
    </Container>
  );
}
