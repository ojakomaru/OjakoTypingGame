import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Header from "../Components/Header";
import MainDisplay from "../Components/MainDisplay";
import Footer from "../Components/Footer";
import { type HomeProps } from "../@types/ModuleTypes";
import { type InputType } from "../@types/ModuleTypes";
import { type HomeDisplayProps } from "../@types/ModuleTypes";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

export default function Home({
  problemNo,
  setProblemNo,
  setting,
  score,
  setScore,
}: HomeProps) {
  const [isHome, setIsHome] = useState<boolean>(true);
  let typingdatas: InputType[] = [];
  let mainSelectProblem: HomeDisplayProps = {
    text: { title: "", description: "", image: "", linkText: "" },
  };

  if (localStorage.hasOwnProperty("typingData")) {
    // 今回登録する配列の結合。。（一旦重複しても構わない仕様として実装する）
    typingdatas = JSON.parse(localStorage.getItem("typingData") as string);
  }

  // メイン画面にタイピングデータを渡す
  useEffect(() => {
    const rnd = Math.floor(Math.random() * typingdatas.length);
    setProblemNo(typingdatas[rnd].id);
    let typingdata = typingdatas.find((obj) => obj.id === typingdatas[rnd].id);
    console.log(typingdata);
    mainSelectProblem = {
      text: {
        title: typingdata?.title,
        description: "texttext",
        image: "https://source.unsplash.com/random?wallpapers",
        linkText: "This Click Edit…",
      },
    };
  }, [problemNo]);

  return (
    <>
      {/* ホーム画面部分 */}
      <Container maxWidth="lg">
        <Header title="OjakoTypingGame" />
        <main>
          <MainDisplay
            problemNo={problemNo}
            text={mainSelectProblem}
            isHome={isHome}
            setIsHome={setIsHome}
          />
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
        </main>
      </Container>
      <Footer title="Footer" description="Ojako Typing App var.1.0.0" />
    </>
  );
}
