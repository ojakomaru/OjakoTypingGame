import React, { useCallback, useEffect, useState } from "react";
import { CircularProgress, Grid } from "@mui/material";
import { TypingDataType } from "../../@types";
import { TypingDataContext } from "../../Contexts/TypingDataContext";
import { useScrollToTop } from "../../Hooks/useScrollToTop";
import TypingItem from "./TypingItem";
import { randomArray, useFetchPhotos } from "../../Hooks";

const TypingLists = () => {
  const { typingdatas, setTypingData } = React.useContext(TypingDataContext);
  const [randDatas, setRandData] = useState<TypingDataType[]>([]);
  const scrollTop = useScrollToTop();
  const { photo, isLoading } = useFetchPhotos();

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
    if (!!typingdatas) {
      // Articleは一旦ランダム表示として実装
      let rand = randomArray(typingdatas.length, 9);
      for (let i = 0; i < rand.length; i++) {
        datas.push(typingdatas[rand[i]]);
      }
      setRandData(datas);
    }
  }, [typingdatas]);

  return (
    <Grid container spacing={{ md: 3 }} columns={{ md: 12 }}>
      {isLoading ? (
        <CircularProgress sx={{ color: "theme.palette.primary.main" }} />
      ) : (
        randDatas.map((post, i) => (
          <Grid item xs={2} sm={4} md={4} key={`typingdata${i}`}>
            <TypingItem
              image={photo.results[i].urls.regular}
              post={post}
              selectedTypingToTop={selectedTypingToTop}
            />
          </Grid>
        ))
      )}
    </Grid>
  );
};
export default TypingLists;
