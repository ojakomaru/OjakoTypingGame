import { Container, Paper, Box } from "@mui/material";
import React, { ReactNode } from "react";

export default function MainDiaplayLayout({ children, isPlaying }: DiaplayLayoutProps) {
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
          backgroundImage: `url("https://source.unsplash.com/random?wallpapers")`,
        }}
      >
        {
          <img
            style={{ display: "none" }}
            src="https://source.unsplash.com/random?wallpapers"
            alt="https://source.unsplash.com/random?wallpapers"
          />
        }
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,.3)",
            display: isPlaying ? "none" : "inherit"
          }}
        />
        {children}
      </Paper>
    </Container>
  );
}

type DiaplayLayoutProps = {
  children: ReactNode;
  isPlaying: boolean;
};
