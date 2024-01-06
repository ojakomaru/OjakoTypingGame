import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { rgbToHex } from "@mui/material";
import { useStartGame } from "../container/useStartGame";
import Paragraph from "../../ui/Paragraph";

interface PlayModalProps {
  setIsPlaying?: (a: boolean) => void;
}
export default function PlayModal({ setIsPlaying }: PlayModalProps) {
  // ゲームをスタートする処理
  useStartGame(setIsPlaying!, []);

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
        <Paragraph style={{ color: rgbToHex("#ffffff") }}>
          ※ゲーム中はescキーでホーム画面に戻ります
        </Paragraph>
        <Paragraph style={{ color: rgbToHex("#ffffff") }}>
          ※ミスした場合「Miss」の文字が消えるまで入力を受け付けません
        </Paragraph>
        <Paragraph style={{ color: rgbToHex("#ffffff") }}>
          ※表示されているローマ字以外でも入力可能です（「し」→「shi」「ci」など）
        </Paragraph>
      </Box>
    </Grid>
  );
}
