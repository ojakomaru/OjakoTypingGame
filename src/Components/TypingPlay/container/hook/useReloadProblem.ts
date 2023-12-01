import React, { useState } from "react";
import {
  LONG_TEXT,
  LOWER,
  REAL_TEXT,
  ROMAJI_TYPE,
  UPPER,
  WORD_INITIAL,
  NONE,
  SHORT_TEXT,
  TYPE_MODE,
  TypingDataType,
} from "../../../../@types";
import { Romanizer } from "../../../../Hooks";

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
  const romanizer = new Romanizer();

  const romajiMod = (
    kanaPos: number,
    pattern: Array<number>,
    romaPos: number
  ) => {
    // パターン変更後のローマ字の判定
    let text = "";
    let currentPosition = 0;
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
    currentPosition = text.length;
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
    setRomajiText(text.replace(/\s/g, "␣"));
    return currentPosition;
  };

  const reloadProblem = (
    typeMode: TYPE_MODE,
    romajiType: ROMAJI_TYPE
  ): boolean => {
    let isMore = false;
    let convRomaText: string | string[][];
    let problem: Pick<TypingDataType["problems"], keyof TypingDataType["problems"]>;
    const romajiTypeSelect = <T extends typeof convRomaText>(romajiText: T) => {
      switch (romajiType) {
        case UPPER:
          return romanizer.upperAll(romajiText);
        case LOWER:
          return romanizer.lowerAll(romajiText);
        case WORD_INITIAL:
          return romanizer.upperWordInitial(romajiText);
        case NONE:
          return romajiText;
          defalut: return romajiText;
      }
    };

    // 問題文が無くなったらfalse
    if (problems.length === 0) return isMore;
    // 設定モードにより分岐
    switch (typeMode) {
      case SHORT_TEXT: // 短文モードの場合
        const rnd = Math.floor(Math.random() * (problemLength - 1));
        problem = problems.splice(rnd, 1);
        setQesutionText(problem[0].text);
        convRomaText = romajiTypeSelect(problem[0].romaji as string);
        setRomajiText(convRomaText as string);
        setKanaText(problem[0].kana as string);
        convRomaText = romajiTypeSelect(problem[0].typingWords as string[][]);
        setTypingWord(convRomaText as string[][]);

        setProblems(problems);
        isMore = true;
        break;
      case LONG_TEXT: // 長文モードの場合
        let text: string = "";
        for (let i = 0; i < problems.length; i++) {
          text += `${problems[i].text}\n`;
        }
        setQesutionText(text);
        problem = problems.splice(0, 1);
        convRomaText = romajiTypeSelect(problem[0].romaji as string);
        setRomajiText(convRomaText as string);
        setKanaText(problem[0].kana as string);
        convRomaText = romajiTypeSelect(problem[0].typingWords as string[][]);
        setTypingWord(convRomaText as string[][]);
        setProblems(problems);
        isMore = true;
        break;
      case REAL_TEXT:
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
