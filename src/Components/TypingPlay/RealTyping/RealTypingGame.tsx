import { Box, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TypingDataType } from "../../../@types";
import { SettingDataContext, TypingDataContext } from "../../../Contexts";
import { useEffectOnce } from "../../../Hooks";
import { TitleInput } from "../../form/presentation";

import { MainDisplay } from "../../MainDisplay/container/MainDisplay";

import { useReloadProblem, useRomajiTypedMove, useKanaTypedMove } from "../container/hook";
import { GameBoard, GameTimer, ShortModeProblems } from "../presentation";

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
    typingWord,
    romajiMod,
    selectRetryProblem,
    problemCount,
    reloadProblem,
  } = useReloadProblem(typingdata.problems);
  const { romajiRef, romajiInit } = useRomajiTypedMove();
  const { kanaRef, kanaInit } = useKanaTypedMove();
  const [missFlg, setMissFlg] = useState(false); // ミスした際のポップアップロジック
  const [missCount, setMissCount] = useState(0); // ミスした回数
  const navigate = useNavigate();
  
  // 問題文生成
  useEffectOnce(() => {
    reloadProblem();
  });

  const defaultValue = {
    problem: "",
  };
  const methods = useForm<typeof defaultValue>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: defaultValue,
  });

  const resetFunc = useCallback(() => {
    methods.reset(defaultValue);
  }, [methods, defaultValue]);

  const onSubmit: SubmitHandler<typeof defaultValue> = (
    inputData: typeof defaultValue
  ) => {};
  return (
    <FormProvider {...methods}>
      <MainDisplay isPlaying={isPlaying} setIsPlaying={setIsPlaying}>
        <GameBoard miss={missFlg}>
          <Box display="flex" justifyContent="flex-end">
            <Typography>ミスタイプ: {missCount}回</Typography>
            <GameTimer />
          </Box>
          <ShortModeProblems
            refs={[kanaRef, romajiRef]}
            kanaText={kanaText}
            showFurigana={showFurigana}
            romajiText={romajiText}
            questionText={questionText}
          />
        </GameBoard>
      </MainDisplay>
      <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <TitleInput />
      </Box>
    </FormProvider>
  );
};

export default RealTypingGame;
