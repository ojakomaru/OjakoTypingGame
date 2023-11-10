import React, { useRef, useState } from 'react'
import { TypingDataType } from '../../../@types'

const useReloadProblem = (
  typingdata: TypingDataType
): [string, string, string, () => boolean] => {
  // 問題をコピーしておく（破壊的な配列操作を行うため）
  const cpProblems = structuredClone(typingdata.problems);
  const [problems, setProblems] = useState(cpProblems);
  // 問題文の数
  const [problemLength] = useState(problems.length);
  const [romajiText, setRomajiText] = useState<string>("");
  const [kanaText, setKanaText] = useState<string>("");
  const [questionText, setQesutionText] = useState<string>("");

  const reloadProblem = (): boolean => {
    // 問題文がないなら真っ白
    if (problems.length == 0) return false;
    // 初期表示はランダムにする
    if (problemLength === problems.length) {
      const rnd = Math.floor(Math.random() * (problemLength - 1));
      const problem = problems.splice(rnd, 1);
      setRomajiText(problem[0].romazi as string);
      setKanaText(problem[0].kana as string);
      setQesutionText(problem[0].text);
    } else {
      const problem = problems.splice(0, 1);
      setRomajiText(problem[0].romazi as string);
      setKanaText(problem[0].kana as string);
      setQesutionText(problem[0].text as string);
    }
    setProblems(problems);
    return true;
  };

  return [romajiText, kanaText, questionText, reloadProblem];
};

export default useReloadProblem