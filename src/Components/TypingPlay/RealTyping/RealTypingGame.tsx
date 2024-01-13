import { Box, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
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
  QuestionText,
  RomajiText,
} from "../presentation";
import RealTextInput from "./RealTextInput";
import RealTextWatcher from "./RealTextWatcher";

export interface InputValues {
  answer: string;
}

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

  const methods = useForm<InputValues>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      answer: "",
    },
  });
  /* 文章判定処理 */
  const onSubmit: SubmitHandler<InputValues> = (inputData: InputValues) => {
    let typedLength = inputData.answer.length;
    let checkText = questionText.substring(0, typedLength);
    // 入力箇所が一致した場合の処理
    if (inputData.answer === checkText) {
      console.log(inputData);
      console.log(checkText);
    } else {
      console.log("不正解");
    }
  };

  return (
    <FormProvider {...methods}>
      <MainDisplay isPlaying={isPlaying} setIsPlaying={setIsPlaying}>
        <GameBoard miss={missFlg}>
          <Box display="flex" justifyContent="flex-end">
            <Typography>ミスタイプ: {missCount}回</Typography>
            <GameTimer />
          </Box>
          <HiraganaText kanaText={kanaText} $showFurigana={showFurigana} />
          <QuestionText questionText={questionText} />
          <RomajiText romaji={romajiText} $isRealMode={true} />
        </GameBoard>
      </MainDisplay>
      <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <RealTextWatcher control={methods.control} />
        <RealTextInput questionText={questionText} />
      </Box>
    </FormProvider>
  );
};

export default RealTypingGame;
