import React, { useEffect, useCallback } from "react";
import { Grid } from "@mui/material";
import { TypingDataType } from "../../@types";
import { TypingDataContext } from "../../Contexts/TypingDataContext";
import { useScrollToTop } from "../../Hooks/useScrollToTop";
import TypingItem from "./TypingItem";
import { randomArray } from "../../Hooks";

export default function TypingLists() {
  const { typingdatas, setTypingDatas, setTypingData } =
    React.useContext(TypingDataContext);
  const scrollTop = useScrollToTop();

  const selectedTypingToTop = useCallback(
    (post: TypingDataType): void => {
      scrollTop();
      setTypingData(post);
    },
    [scrollTop, setTypingData]
  );

  // 最大表示件数を制限
  useEffect(() => {
    const datas: TypingDataType[] = [];
    // Articleは一旦ランダム表示として実装
    let rand = randomArray(typingdatas.length, 9);
    for (let i = 0; i < rand.length; i++) {
      datas.push(typingdatas[i]);
    }
    setTypingDatas(datas);
  }, []);

  return (
    <Grid container spacing={{ md: 3 }} columns={{ md: 12 }}>
      {typingdatas &&
        typingdatas.map((post, index) => (
          <Grid item xs={2} sm={4} md={4} key={`typingdata${index}`}>
            <TypingItem post={post} selectedTypingToTop={selectedTypingToTop} />
          </Grid>
        ))}
    </Grid>
  );
}
