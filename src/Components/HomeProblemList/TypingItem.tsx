import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TypingDataType } from "../../@types";
import { strTo3Leader } from "../../Hooks";

interface TypingItemProps {
  post: TypingDataType;
  selectedTypingToTop: (post: TypingDataType) => void;
}
const TypingItem = (props: TypingItemProps) => {
  const { post, selectedTypingToTop } = props;
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => selectedTypingToTop(post)}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
    >
      <CardMedia
        component="div"
        sx={{
          pt: "56.25%",
        }}
        image="https://source.unsplash.com/random?wallpapers"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {post.title}
        </Typography>
        <Typography>{strTo3Leader(post.problems[0].text, 30)}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => navigate(`/form/${post.id}`)} variant="outlined">
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default TypingItem;
