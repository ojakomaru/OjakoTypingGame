import React, { useEffect, useRef, useState } from "react";
import { SHOW, type TypingDataType } from "../../../@types";
import GameBoard from "../../TypingPlay/presentation/GameBoard";
import { HiraganaText } from "../../TypingPlay/presentation/HiraganaText";
import { QuestionText } from "../../TypingPlay/presentation/QuestionText";
import { RomajiText } from "../../TypingPlay/presentation/RomajiText";
import { SettingDataContext } from "../../../Contexts";
import useReloadProblem from "../../TypingPlay/container/useReloadProblem";

type SettingExampleProps = {
  typingdata: TypingDataType;
};
const SettingExample = ({ typingdata }: SettingExampleProps) => {
  const { typeMode, showFurigana, romajiType, showKeyboard } =
    React.useContext(SettingDataContext);

  // 問題文生成
  useEffect(() => {
    reloadProblem();
  }, []);
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
