import { Box, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SettingDataContext, TypingDataContext } from "../../../../Contexts";
import { useCountdown } from "../../../../Hooks";
import { MainDisplay } from "../../../MainDisplay/container/MainDisplay";
import { Countdown } from "../../../MainDisplay/presentation";
import QuestionBox from "../../../QuestionBox/QuestionBox";
import ResultScore from "../../../Score/container/ResultScore";
import { useEscapeWithHome } from "./hook/useEscapeWithHome";

import {
  GameBoard,
  GameTimer,
  HiraganaText,
  RomajiText,
} from "../../presentation";
import RealTextInput from "../presentation/RealTextInput";
import useGameManager from "./hook/useGameManager";
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
  const [isStandby, setIsStandby] = useState(true);
  const { count } = useCountdown(isStandby, setIsPlaying);

  const {
    gameInit,
    missFlg,
    finished,
    missCount,
    typo,
    totalType,
    timeOfTyping,
    missRecode,
    retry,
    missedOnlyRetry,
    typingConplate,
    romajiText,
    kanaText,
    questionText,
    questionMod,
    problemCount,
  } = useGameManager(setIsPlaying as (a: boolean) => void, typingdata.problems);

  const navigate = useNavigate();
  const { reset, control, handleSubmit, setFocus } = useForm<InputValues>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: defaultValue,
  });

  // 問題文生成
  useEffect(() => {
    if (!isStandby) gameInit();
  }, [isStandby]);

  useEscapeWithHome(setIsPlaying);
  /* 文章判定処理 */
  const onSubmit: SubmitHandler<InputValues> = (inputData: InputValues) => {
    let typed = inputData.answer.length;
    let checkText = questionText.substring(0, typed);

    // 入力箇所が一致した場合の処理
    if (inputData.answer.replace(/\s/g, "␣") === checkText) {
      questionMod(typed);
      reset(defaultValue);
      // 1問の問題文が完了したとき
      if (typed === questionText.length) {
        typingConplate(romajiText.length, problemCount);
      }
    } else {
      missRecode(" ");
    }
  };

  return (
    <React.Fragment>
      {finished ? (
        <ResultScore
          totalType={totalType}
          missCount={missCount}
          typo={typo}
          timeOfTyping={timeOfTyping}
          retry={retry}
          missedRetry={missedOnlyRetry}
        />
      ) : (
        <Fragment>
          <MainDisplay isStandby={isStandby} setIsStandby={setIsStandby}>
            {!isPlaying ? (
              <Countdown count={count} />
            ) : (
              <GameBoard miss={missFlg}>
                <Box display="flex" justifyContent="flex-end">
                  <Typography>ミス問題: {missCount}問</Typography>
                  <GameTimer />
                </Box>
                <HiraganaText
                  kanaText={kanaText}
                  $showFurigana={showFurigana}
                />
                <RealTextWatcher
                  control={control}
                  questionText={questionText}
                />
                <RomajiText romaji={romajiText} $isRealMode={true} />
              </GameBoard>
            )}
          </MainDisplay>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {!isPlaying ? (
              <QuestionBox problems={typingdata.problems} />
            ) : (
              <RealTextInput control={control} />
            )}
          </Box>
        </Fragment>
      )}
    </React.Fragment>
  );
};

export default RealTypingGame;
