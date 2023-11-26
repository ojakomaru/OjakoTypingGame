import React, { useEffect, useRef, useState } from "react";
import { SHOW, type TypingDataType } from "../../../@types";
import { SettingDataContext } from "../../../Contexts";
import useReloadProblem from "../../TypingPlay/container/hook/useReloadProblem";
import {
  GameBoard,
  HiraganaText,
  QuestionText,
  RomajiText,
} from "../../TypingPlay/presentation";
import { useEffectOnce } from "../../../Hooks";

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
    useReloadProblem(typingdata);
  return (
    <GameBoard>
      {showFurigana === SHOW && <HiraganaText kanaText={kanaText} />}
      <QuestionText questionText={questionText} />
      <RomajiText romaji={romajiText} />
    </GameBoard>
  );
};

export default SettingExample;
