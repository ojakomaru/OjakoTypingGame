import React, { ReactNode } from "react";
import { Container, Paper, Box, CircularProgress } from "@mui/material";
import { useFetchPhotos } from "../../Hooks";
import { randomArray } from "../../Util";

type DisplayLayoutProps = {
  children: ReactNode;
  isPlaying?: boolean;
};
export default function MainDisplayLayout({
  children,
  isPlaying,
}: DisplayLayoutProps) {
  const { photo, isLoading } = useFetchPhotos("dog");
  let randPhoto: Array<number> = [];
  if (!isLoading) randPhoto = randomArray(photo.results.length);

  return (
    <Container maxWidth="md">
      {isLoading ? (
        <CircularProgress sx={{ color: "theme.palette.primary.main" }} />
      ) : (
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            backgroundColor: "grey.800",
            color: "#fff",
            mb: 2,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(${photo.results[randPhoto[0]].urls.regular})`,
          }}
        >
          <img
            style={{ display: "none" }}
            src={photo.results[randPhoto[0]].urls.regular}
            alt={photo.results[randPhoto[0]].alt_description}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: "rgba(0,0,0,.3)",
              display: isPlaying ? "none" : "inherit",
            }}
          />
          {children}
        </Paper>
      )}
    </Container>
  );
}
