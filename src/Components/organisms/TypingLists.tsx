import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import Home from "../Pages/Home";
import { TypingDataType } from "../../@types";
type G_Props = React.ComponentPropsWithRef<typeof Home>;
type TypingListProps = {
  moveTo: () => void;
} & G_Props;

export default function TypingLists(props: TypingListProps) {
  const { typingdatas, setTypingData, moveTo } = props;
  const selectedTypingToTop = (post: TypingDataType): void => {
    moveTo();
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
