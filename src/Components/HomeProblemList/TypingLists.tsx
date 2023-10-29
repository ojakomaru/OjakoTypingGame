import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { TypingDataType } from "../../@types";
import { TypingDataContext } from "../../Contexts/TypingDataContext";
import { useScrollToTop } from "../../Hooks/useScrollToTop";

export default function TypingLists() {
  const { typingdatas, setTypingData } = React.useContext(TypingDataContext);
  const scrollTop = useScrollToTop();
  const selectedTypingToTop = (post: TypingDataType): void => {
    scrollTop();
    setTypingData(post);
  };

  return (
    <Grid container spacing={{ md: 3 }} columns={{ md: 12 }}>
      {typingdatas &&
        typingdatas.map((post, index) => (
          <Grid item xs={2} sm={4} md={4} key={post.id}>
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
                <Typography>{`${post.problems[0].text}...`}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">View</Button>
                <Button size="small">Edit</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
}
