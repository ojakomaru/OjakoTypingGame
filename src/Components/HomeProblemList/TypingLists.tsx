import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { TypingDataType } from "../../@types";
import { TypingDataContext } from "../../Contexts/TypingDataContext";
import { useScrollToTop } from "../../Hooks/useScrollToTop";
import TypingItem from "./TypingItem";
import { randomArray } from "../../Hooks";

export default function TypingLists() {
  const { typingdatas, setTypingData } = React.useContext(TypingDataContext);
  const scrollTop = useScrollToTop();
  const selectedTypingToTop = (post: TypingDataType): void => {
    scrollTop();
    setTypingData(post);
  };

  // 最大表示件数を制限
  const datas: TypingDataType[] = [];
  useEffect(() => {
    let rand = randomArray(typingdatas.length, 9)
    for (let i = 0; i < rand.length; i++) {
      datas.push(typingdatas[i]);
    }
  }, [typingdatas]);

  return (
    <Grid container spacing={{ md: 3 }} columns={{ md: 12 }}>
      {typingdatas &&
        datas.map((post, index) => (
          <Grid item xs={2} sm={4} md={4} key={post.id}>
            <TypingItem post={post} selectedTypingToTop={selectedTypingToTop} />
          </Grid>
        ))}
    </Grid>
  );
}
