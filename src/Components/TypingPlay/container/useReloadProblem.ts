import React, { useState } from "react";
import {
  LONG_TEXT,
  LOWER,
  REAL_TEXT,
  ROMAJI_TYPE,
  SHIFT_REQUIRED,
  SHORT_TEXT,
  TYPE_MODE,
  TypingDataType,
  UPPER,
} from "../../../@types";

const useReloadProblem = (typingdata: TypingDataType) => {
  // 問題をコピーしておく（破壊的な配列操作を行うため）
  const cpProblems = structuredClone(typingdata.problems);
  const [problems, setProblems] = useState(cpProblems);
  // 問題文の数
  const [problemLength] = useState(problems.length);
  const [romajiText, setRomajiText] = useState<string>("");
  const [kanaText, setKanaText] = useState<string>("");
  const [questionText, setQesutionText] = useState<string>("");
  const [typingWord, setTypingWord] = useState<Array<string[]>>([[]]);

  const romajiTypeSelect = (ROMAJI_TYPE: ROMAJI_TYPE) => {
    switch (ROMAJI_TYPE) {
      case UPPER:
        break;
      case LOWER:
        break;
      case SHIFT_REQUIRED:
        break;
    }
  };

  const romajiMod = (text: string) => setRomajiText(text);
  const reloadProblem = (
    typeMode: TYPE_MODE,
    romajiType: ROMAJI_TYPE
  ): boolean => {
    let isMore = false;
    const spliceSet = () => {
      const problem = problems.splice(0, 1);
      setRomajiText(problem[0].romaji as string);
      setKanaText(problem[0].kana as string);
    };

    // 問題文が無くなったらfalse
    if (problems.length == 0) return isMore;
    // 設定モードにより分岐
    switch (typeMode) {
      case SHORT_TEXT: // 短文モードの場合
        if (problemLength === problems.length) {
          const rnd = Math.floor(Math.random() * (problemLength - 1));
          const problem = problems.splice(rnd, 1);
          setRomajiText(problem[0].romaji as string);
          setKanaText(problem[0].kana as string);
          setQesutionText(problem[0].text);
          setTypingWord(problem[0].typingWords as string[][]);
        } else {
          const problem = problems.splice(0, 1);
          setRomajiText(problem[0].romaji as string);
          setKanaText(problem[0].kana as string);
          setQesutionText(problem[0].text as string);
          setTypingWord(problem[0].typingWords as string[][]);
        }
        setProblems(problems);
        isMore = true;
        break;
      case LONG_TEXT: // 長文モードの場合
        if (problemLength === problems.length) {
          let text: string = "";
          cpProblems.reverse();
          for (let i = 0; i < cpProblems.length; i++) {
            text += `${problems[i].text}\n`;
          }
          setQesutionText(text);
          const problem = problems.splice(0, 1);
          setRomajiText(problem[0].romaji as string);
          setKanaText(problem[0].kana as string);
          setTypingWord(problem[0].typingWords as string[][]);
        } else {
          const problem = problems.splice(0, 1);
          setRomajiText(problem[0].romaji as string);
          setKanaText(problem[0].kana as string);
          setTypingWord(problem[0].typingWords as string[][]);
        }
        setProblems(problems);
        isMore = true;
        break;
      case REAL_TEXT:
        if (problemLength === problems.length) {
          const rnd = Math.floor(Math.random() * (problemLength - 1));
          const problem = problems.splice(rnd, 1);
          setRomajiText(problem[0].romaji as string);
          setKanaText(problem[0].kana as string);
          setQesutionText(problem[0].text);
          setTypingWord(problem[0].typingWords as string[][]);
        } else {
          const problem = problems.splice(0, 1);
          setRomajiText(problem[0].romaji as string);
          setKanaText(problem[0].kana as string);
          setQesutionText(problem[0].text as string);
          setTypingWord(problem[0].typingWords as string[][]);
        }
        setProblems(problems);
        isMore = true;
        break;
      default:
    }
    return isMore;
  };

  return {
    romajiText,
    kanaText,
    questionText,
    typingWord,
    romajiMod,
    reloadProblem,
  };
};

export default useReloadProblem;
