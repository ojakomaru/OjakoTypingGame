import React, { useEffect, useRef, useState } from "react";
import { LONG_TEXT, SHOW, type TypingDataType } from "../../../@types";
import { SettingDataContext } from "../../../Contexts";
import useReloadProblem from "../../TypingPlay/container/hook/useReloadProblem";
import {
  GameBoard,
  HiraganaText,
  QuestionText,
  RomajiText,
} from "../../TypingPlay/presentation";
import { useEffectOnce } from "../../../Hooks";
import { Divider } from "@mui/material";

type SettingExampleProps = {
  typingdata: TypingDataType;
};
const SettingExample = ({ typingdata }: SettingExampleProps) => {
  const { typeMode, romajiType, showFurigana } =
    React.useContext(SettingDataContext);

  // 問題文生成
  useEffectOnce(() => {
    reloadProblem(typeMode, romajiType);
  });
  const { romajiText, kanaText, questionText, reloadProblem } =
    useReloadProblem(typingdata.problems);
  return (
    <GameBoard>
      <HiraganaText kanaText={kanaText} $showFurigana={showFurigana} />
      {typeMode === LONG_TEXT ? ( // 長文モード時
        <>
          <RomajiText romaji={romajiText} className="romajiLongMode" />
          <Divider
            variant="middle"
            sx={{ borderColor: "primary.main", width: "100%", height: "3px" }}
          />
          <QuestionText
            questionText={questionText}
            $longMode={typeMode === LONG_TEXT}
          />
        </>
      ) : (
        <>
          <QuestionText questionText={questionText} />
          <RomajiText romaji={romajiText} />
        </>
      )}
    </GameBoard>
  );
};

export default SettingExample;
