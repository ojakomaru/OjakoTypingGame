import React, { useEffect, useRef, useState } from "react";
import { type TypingDataType } from "../../../@types";
import GameBoard from "../../TypingPlay/presentation/GameBoard";
import { HiraganaText } from "../../TypingPlay/presentation/HiraganaText";
import { QuestionText } from "../../TypingPlay/presentation/QuestionText";
import { RomajiText } from "../../TypingPlay/presentation/RomajiText";

type SettingExampleProps = {
  typingdata: TypingDataType;
};
const SettingExample = ({ typingdata }: SettingExampleProps) => {
  const questionRef = useRef<HTMLParagraphElement>(null);
  // 問題をコピーしておく（破壊的な配列操作を行うため）
  const cpProblems = structuredClone(typingdata.problems);
  const [problems, setProblems] = useState(cpProblems);
  // 問題文の数
  const [problemLength] = useState(problems.length);
  const [romajiText, setRomajiText] = useState<string | undefined>("");
  const [kanaText, setKanaText] = useState<string | undefined>("");

  // 問題文生成
  useEffect(() => {
    reloadProblem();
  }, []);
  const reloadProblem = (): boolean => {
    if (problems.length == 0) return false;
    // 初期表示はランダムにする
    if (problemLength === problems.length) {
      const rnd = Math.floor(Math.random() * (problemLength - 1));
      const problem = problems.splice(rnd, 1);
      setRomajiText(problem[0].romazi);
      setKanaText(problem[0].kana);
      questionRef.current!.innerText = problem[0].text;
    } else {
      const problem = problems.splice(0, 1);
      setRomajiText(problem[0].romazi);
      setKanaText(problem[0].kana);
      questionRef.current!.innerText = problem[0].text;
    }
    setProblems(problems);
    return true;
  };
  return(
    <GameBoard>
      <HiraganaText kanaText={kanaText} />
      <QuestionText ref={questionRef} />
      <RomajiText romaji={romajiText} />
    </GameBoard>
  );
};

export default SettingExample;
