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
import { type InputType } from "../../@types/ModuleTypes";

type TypingListsProps = {
  typingdatas: InputType[];
  setProblemNo: (a:string) => void;
};

export default function TypingLists({ typingdatas, setProblemNo }: TypingListsProps) {
  return (
    <Grid container spacing={{ md: 3 }} columns={{ md: 12 }}>
      {typingdatas &&
        typingdatas.map((post, index) => (
          <Grid item xs={2} sm={4} md={4} key={post.id}>
            <Card
              onClick={() => setProblemNo(post.id)}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
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
