import React, { useCallback, useEffect, useState } from "react";
import { Box, CircularProgress, Grid } from "@mui/material";
import { TypingDataType } from "../../@types";
import { TypingDataContext } from "../../Contexts/TypingDataContext";
import { useScrollToTop } from "../../Hooks/useScrollToTop";
import TypingItem from "./TypingItem";
import { useFetchPhotos } from "../../Hooks";
import { randomArray } from "../../Util";

const TypingLists = () => {
  const { typingdatas, setTypingData } = React.useContext(TypingDataContext);
  const [randDatas, setRandData] = useState<TypingDataType[]>([]);
  const scrollTop = useScrollToTop();
  const { photo, isLoading } = useFetchPhotos("cat");
  let randPhoto: Array<number> = [];
  if (!isLoading) randPhoto = randomArray(photo.results.length);

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
    if (typingdatas) {
      // Articleは一旦ランダム表示として実装
      const rand = randomArray(typingdatas.length, 9);
      for (let i = 0; i < rand.length; i++) {
        datas.push(typingdatas[rand[i]]);
      }
      setRandData(datas);
    }
  }, [typingdatas]);

  return (
    <Grid container spacing={{ md: 3 }} columns={{ md: 12 }}>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <CircularProgress sx={{ color: "theme.palette.primary.main" }} />
        </Box>
      ) : (
        randDatas.map((post, i) => (
          <Grid item xs={2} sm={4} md={4} key={`typingdata${i}`}>
            <TypingItem
              image={photo.results[randPhoto[i]].urls.regular}
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
