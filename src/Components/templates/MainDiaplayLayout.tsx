import { Container, Paper, Box } from "@mui/material";
import React, { ReactNode } from "react";


export default function MainDiaplayLayout({
  data,
  children,
}: DiaplayLayoutProps) {

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
          backgroundImage: `url(${data.image})`,
        }}
      >
        {<img style={{ display: "none" }} src={data.image} alt={data.title} />}
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
        {children}
      </Paper>
    </Container>
  );
}

type DiaplayLayoutProps = {
  data: any;
  children: ReactNode;
};
