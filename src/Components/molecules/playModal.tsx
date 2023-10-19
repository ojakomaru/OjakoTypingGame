import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { rgbToHex } from "@mui/material";

interface PlayModalProps {
  setIsPlaying?: (a: boolean) => void;
}
export default function PlayModal({ setIsPlaying }: PlayModalProps) {
  // ゲームをスタートする処理
  useEffect(() => {
    window.document.onkeydown = function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setIsPlaying!(true);
      }
    };
    return () => {
      window.document.onkeydown = null;
    };
  });

  return (
    <Grid container justifyContent="center">
      <Box
        component="div"
        sx={{
          position: "relative",
          p: { xs: 3, md: 6 },
          pr: { md: 0 },
          textAlign: "center",
        }}
      >
        <Typography variant="h4" color="inherit" gutterBottom paragraph>
          【Space か Enter キーを押すとスタートします】
        </Typography>
        <Typography variant="h5" color="inherit" paragraph>
          Press "Space" or "Enter" key to start!!
        </Typography>
        <Link variant="subtitle1" href="/" color={rgbToHex("#ffffff")}>
          ※ゲーム中はescキーでホーム画面に戻ります。
        </Link>
      </Box>
    </Grid>
  );
}
