import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SettingDataContext, TypingDataContext } from "../../../Contexts";
import { useEffectOnce } from "../../../Hooks";
import { MainDisplay } from "../../MainDisplay/container/MainDisplay";
import { useReloadProblem } from "../container/hook";
import {
  GameBoard,
  GameTimer,
  HiraganaText,
  RomajiText,
} from "../presentation";
import RealTextInput from "./RealTextInput";
import RealTextWatcher from "./RealTextWatcher";

export interface InputValues {
  answer: string;
}
const defaultValue = {
  answer: "",
};

interface RealTypingGameProps {
  isPlaying: boolean;
  setIsPlaying: (a: boolean) => void;
}
const RealTypingGame = (props: RealTypingGameProps) => {
  const { isPlaying, setIsPlaying } = props;
  const { typingdata } = React.useContext(TypingDataContext);
  const { showFurigana } = React.useContext(SettingDataContext);
  const {
    romajiText,
    kanaText,
    questionText,
    questionMod,
    selectRetryProblem,
    problemCount,
    reloadProblem,
  } = useReloadProblem(typingdata.problems);
  const [missFlg, setMissFlg] = useState(false); // ミスした際のポップアップロジック
  const [missCount, setMissCount] = useState(0); // ミスした回数
  const navigate = useNavigate();

  // 問題文生成
  useEffectOnce(() => {
    reloadProblem();
  });

  const { reset, control, handleSubmit } = useForm<InputValues>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: defaultValue,
  });
  /* 文章判定処理 */
  const onSubmit: SubmitHandler<InputValues> = (inputData: InputValues) => {
    let typed = inputData.answer.length;
    let checkText = questionText.substring(0, typed);
    console.log(inputData.answer.replace(/\s/g, "␣"));
    console.log(checkText);
    // 入力箇所が一致した場合の処理
    if (inputData.answer.replace(/\s/g, "␣") === checkText) {
      console.log("正解です。");
      questionMod(typed);
      reset(defaultValue);
      // 1問の問題文が完了したとき
      if (typed === questionText.length) {
        let isProblem = reloadProblem();
        if (!isProblem) console.log("ゲームクリア！");
      }
    } else {
      console.log("不正解");
      setMissFlg(true);
      setTimeout(function () {
        setMissFlg(false);
      }, 100);
    }
  };

  return (
    <React.Fragment>
      <MainDisplay isPlaying={isPlaying} setIsPlaying={setIsPlaying}>
        <GameBoard miss={missFlg}>
          <Box display="flex" justifyContent="flex-end">
            <Typography>ミス問題: {missCount}問</Typography>
            <GameTimer />
          </Box>
          <HiraganaText kanaText={kanaText} $showFurigana={showFurigana} />
          <RealTextWatcher
            control={control}
            questionText={questionText}
          />
          <RomajiText romaji={romajiText} $isRealMode={true} />
        </GameBoard>
      </MainDisplay>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <RealTextInput control={control} />
      </Box>
    </React.Fragment>
  );
};

export default RealTypingGame;
