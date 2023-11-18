import React, { useCallback, useEffect, useRef, useState } from "react";
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

  const typingModeSelect = (typeMode: TYPE_MODE) => {
    switch (typeMode) {
      case SHORT_TEXT:
        break;
      case LONG_TEXT:
        break;
      case REAL_TEXT:
        break;
    }
  };

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
  const reloadProblem = (
    typeMode: TYPE_MODE,
    romajiType: ROMAJI_TYPE
  ): boolean => {
    let isMore = false;
    const spliceSet = () => {
      const problem = problems.splice(0, 1);
      setRomajiText(problem[0].romazi as string);
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
        isMore = true;
        break;
      case LONG_TEXT: // 長文モードの場合
        if (problemLength === problems.length) {
          let text: string = "";
          for (let i = 0; i < problems.length; i++) {
            text += `${problems[i].text}\n`;
          }
          setQesutionText(text);
          spliceSet();
        } else {
          spliceSet();
        }
        setProblems(problems);
        isMore = true;
        break;
      case REAL_TEXT:
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
        isMore = true;
        break;
      default:
    }
    return isMore;
  };

  return { romajiText, kanaText, questionText, reloadProblem };
};

export default useReloadProblem;