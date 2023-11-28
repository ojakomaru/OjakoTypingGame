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
} from "../../../../@types";

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

  const romajiMod = (
    kanaPos: number,
    pattern: Array<number>,
    romaPos: number
  ) => {
    // パターン変更後のローマ字の判定
    let text = "";
    if (kanaPos > 0) {
      // 現在入力完了の文字列を生成
      for (let i = 0; i < kanaPos; i++) {
        text += typingWord[i][pattern[i]];
      }
    }
    // 現在入力したローマ字文字を追加
    for (let i = 0; i <= romaPos; i++) {
      text += typingWord[kanaPos][pattern[kanaPos]][i];
    }
    // 現在入力中のローマ字を追加
    for (
      let i = romaPos + 1;
      i < typingWord[kanaPos][pattern[kanaPos]].length;
      i++
    ) {
      text += typingWord[kanaPos][pattern[kanaPos]][i];
    }
    // 残りの問題文のローマ字を追加
    for (let i = kanaPos + 1; i < typingWord.length; i++) {
      text += typingWord[i][pattern[i]];
    }
    setRomajiText(text);
  };

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
    if (problems.length === 0) return isMore;
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
        let text: string = "";
        for (let i = 0; i < problems.length; i++) {
          text += `${problems[i].text}\n`;
        }
        setQesutionText(text);
        const problem = problems.splice(0, 1);
        setRomajiText(problem[0].romaji as string);
        setKanaText(problem[0].kana as string);
        setTypingWord(problem[0].typingWords as string[][]);
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
