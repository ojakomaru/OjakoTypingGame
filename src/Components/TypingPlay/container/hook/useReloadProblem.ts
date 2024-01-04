import React, { useCallback, useRef, useState } from "react";
import {
  SHORT_TEXT,
  LONG_TEXT,
  REAL_TEXT,
  UPPER,
  LOWER,
  ROMAJI_TYPE,
  WORD_INITIAL,
  NONE,
  TYPE_MODE,
  RANDOM,
  ProblemType,
} from "../../../../@types";
import { SettingDataContext } from "../../../../Contexts";
import { Romanizer, randomArray, useEffectOnce } from "../../../../Hooks";

const useReloadProblem = (problemsProps: ProblemType) => {
  const { order } = React.useContext(SettingDataContext);
  // 問題をコピーしておく（破壊的な配列操作を行うため）
  const cpProblems = structuredClone(problemsProps);

  /**
   * 問題文の配列をランダムに入れ替える
   * @param 問題数
   * @returns 順番を入れ替えた問題文を返す
   */
  const randomProblemCreate = useCallback(
    (problemLength: number = cpProblems.length) => {
      let initAry = randomArray(problemLength);
      let randProblems: ProblemType = [];
      for (let i = 0; i < initAry.length; i++) {
        randProblems.push(cpProblems[initAry[i]]);
      }
      return randProblems;
    },
    [cpProblems]
  );
  const [problems, setProblems] = useState(
    order === RANDOM ? randomProblemCreate() : cpProblems
  );
  const problemRef = useRef<ProblemType>(structuredClone(problems));
  const [problemCount, setProblemCount] = useState(0); //出題数
  const [romajiText, setRomajiText] = useState<string>("");
  const [kanaText, setKanaText] = useState<string>("");
  const [questionText, setQesutionText] = useState<string>("");
  const [typingWord, setTypingWord] = useState<Array<string[]>>([[]]);
  const romanizer = new Romanizer();

  const selectRetryProblem = useCallback(
    (missedProblems: Array<number>) => {
      let tmpProblems: ProblemType = [];
      for (let i = 0; i < missedProblems.length; i++) {
        tmpProblems.push(problemRef.current[missedProblems[i] - 1]);
      }
      return tmpProblems;
    },
    [problemRef]
  );

  /**
   * 入力パターンを変更したときにその変更内容に表示用ローマ字テキストを書き換えます
   * @param kanaPos ひらがなのポジション
   * @param pattern 複数パターンのローマ字配列
   * @param romaPos ローマ字一文字のポジション
   * @return: number 現在入力中の文章のポジション
   */
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
    romajiType: ROMAJI_TYPE,
    retryProblem?: ProblemType
  ): boolean => {
    let isMore = false;
    let convRomaText: string | string[][];
    let problem: ProblemType;
    let reloadProblem = retryProblem ? retryProblem : problems;

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
      }
    };

    // 問題文が無くなったらfalse
    if (reloadProblem.length === 0) return isMore;

    // 設定モードにより分岐
    switch (typeMode) {
      case SHORT_TEXT: // 短文モードの場合
        problem = reloadProblem.splice(0, 1);
        setQesutionText(problem![0].text);
        isMore = true;
        break;
      case LONG_TEXT: // 長文モードの場合
        let text: string = "";
        for (let i = 0; i < reloadProblem.length; i++) {
          text += `${reloadProblem[i].text}\n`;
        }
        setQesutionText(text);
        problem = reloadProblem.splice(0, 1);
        isMore = true;
        break;
      case REAL_TEXT:
        break;
    }
    convRomaText = romajiTypeSelect(problem![0].romaji as string);
    setRomajiText(convRomaText as string);
    setKanaText(problem![0].kana as string);
    convRomaText = romajiTypeSelect(problem![0].typingWords as string[][]);
    setTypingWord(convRomaText as string[][]);
    setProblems(reloadProblem);
    setProblemCount((prev) => prev + 1);
    return isMore;
  };

  return {
    romajiText,
    kanaText,
    questionText,
    typingWord,
    romajiMod,
    selectRetryProblem,
    problemCount,
    reloadProblem,
  };
};

export default useReloadProblem;
