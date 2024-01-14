import { Box, Typography } from "@mui/material";
import React, { Fragment, useCallback, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SettingDataContext, TypingDataContext } from "../../../Contexts";
import { useEffectOnce } from "../../../Hooks";
import { MainDisplay } from "../../MainDisplay/container/MainDisplay";
import QuestionBox from "../../QuestionBox/QuestionBox";
import ResultScore from "../../Score/container/ResultScore";
import { useReloadProblem, useTypingGame } from "../container/hook";
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
  const {
    finished,
    missCount,
    typo,
    totalType,
    timeOfTyping,
    missRecode,
    retry,
    missedOnlyRetry,
    typingConplate,
    gameClear,
  } = useTypingGame(setIsPlaying as (a: boolean) => void);

  // クリア後のミスだけもう一回関数
  const missedRetry = useCallback(() => {
    missedOnlyRetry(selectRetryProblem, reloadProblem);
  }, [missedOnlyRetry, selectRetryProblem, reloadProblem]);

  const [missFlg, setMissFlg] = useState(false); // ミスした際のポップアップロジック
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

    // 入力箇所が一致した場合の処理
    if (inputData.answer.replace(/\s/g, "␣") === checkText) {
      questionMod(typed);
      reset(defaultValue);
      // 1問の問題文が完了したとき
      if (typed === questionText.length) {
        typingConplate(romajiText.length, problemCount);
        let isProblem = reloadProblem();
        if (!isProblem) gameClear();
      }
    } else {
      setMissFlg(true);
      setTimeout(function () {
        setMissFlg(false);
      }, 100);
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
          missedRetry={missedRetry}
        />
      ) : (
        <Fragment>
          <MainDisplay isPlaying={isPlaying} setIsPlaying={setIsPlaying}>
            <GameBoard miss={missFlg}>
              <Box display="flex" justifyContent="flex-end">
                <Typography>ミス問題: {missCount}問</Typography>
                <GameTimer />
              </Box>
              <HiraganaText kanaText={kanaText} $showFurigana={showFurigana} />
              <RealTextWatcher control={control} questionText={questionText} />
              <RomajiText romaji={romajiText} $isRealMode={true} />
            </GameBoard>
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
