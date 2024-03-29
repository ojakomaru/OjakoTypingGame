import { useCallback, useRef, useState } from 'react';
import {
  SHORT_TEXT,
  LONG_TEXT,
  REAL_TEXT,
  UPPER,
  LOWER,
  WORD_INITIAL,
  NONE,
  RANDOM,
  ProblemType,
} from '../../../../@types';
import { useSettingDataContext } from '../../../../Contexts';
import { randomArray, Romanizer } from '../../../../Util';

const useReloadProblem = (problemsProps: ProblemType) => {
  // 問題をコピーしておく（破壊的な配列操作を行うため）
  const cpProblems = structuredClone(problemsProps);
  const { typeMode, romajiType, order } = useSettingDataContext();

  /**
   * 問題文の配列をランダムに入れ替える
   * @param 問題数
   * @returns 順番を入れ替えた問題文を返す
   */
  const randomProblemCreate = useCallback(
    (problemLength: number = problemsProps.length) => {
      const initAry = randomArray(problemLength);
      const randProblems: ProblemType = [];
      for (let i = 0; i < initAry.length; i++) {
        randProblems.push(problemsProps[initAry[i]]);
      }
      return randProblems;
    },
    [problemsProps]
  );
  const [problems, setProblems] = useState(order === RANDOM ? randomProblemCreate() : cpProblems);
  const problemRef = useRef<ProblemType>(structuredClone(problems));
  const [problemCount, setProblemCount] = useState(0); // 出題数
  const [romajiText, setRomajiText] = useState<string>('');
  const [kanaText, setKanaText] = useState<string>('');
  const [questionText, setQesutionText] = useState<string>('');
  const [typingWord, setTypingWord] = useState<Array<string[]>>([[]]);
  const romanizer = new Romanizer();

  /**
   * 最初に出題した問題文の中からミスした問題文のみを返す
   * @param missedProblems ミスした問題の出題番号の配列 ※[2,4,5]など
   * @returns tmpProblems ミスした出題番号から作成した新たな問題文
   */
  const selectRetryProblem = useCallback(
    (missedProblems: Array<number>) => {
      const retryProblems: ProblemType = [];
      for (let i = 0; i < missedProblems.length; i++) {
        retryProblems.push(problemRef.current[missedProblems[i] - 1]);
      }
      setProblemCount(0);
      return retryProblems;
    },
    [problemRef]
  );

  const questionMod = (currentTyped: number) => {
    const modText = questionText.substring(currentTyped);
    setQesutionText(modText);
  };

  /**
   * 入力パターンを変更したときにその変更内容に表示用ローマ字テキストを書き換えます
   * @param kanaPos ひらがなのポジション
   * @param pattern 複数パターンのローマ字配列
   * @param romaPos ローマ字一文字のポジション
   * @return: number 現在入力中の文章のポジション
   */
  const romajiMod = (kanaPos: number, pattern: Array<number>, romaPos: number) => {
    // パターン変更後のローマ字の判定
    let text = '';
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
    for (let i = romaPos + 1; i < typingWord[kanaPos][pattern[kanaPos]].length; i++) {
      text += typingWord[kanaPos][pattern[kanaPos]][i];
    }
    // 残りの問題文のローマ字を追加
    for (let i = kanaPos + 1; i < typingWord.length; i++) {
      text += typingWord[i][pattern[i]];
    }
    setRomajiText(text.replace(/\s/g, '␣'));
    return currentPosition;
  };

  const reloadProblem = (retryProblem?: ProblemType): boolean => {
    let isMore = false;
    let convRomaText: string | string[][];
    let problem: ProblemType;
    const tempProblems = retryProblem || problems;

    // 問題文が無くなったらfalse
    if (tempProblems.length === 0) {
      setProblems(structuredClone(problemRef.current));
      return isMore;
    }

    const romajiTypeSelect = <T extends typeof convRomaText>(text: T) => {
      switch (romajiType) {
        case UPPER:
          return romanizer.upperAll(text);
        case LOWER:
          return romanizer.lowerAll(text);
        case WORD_INITIAL:
          return romanizer.upperWordInitial(text);
        case NONE:
          return text;
        default:
          return text;
      }
    };

    // 設定モードにより分岐
    if (typeMode === LONG_TEXT) {
      let text = '';
      for (let i = 0; i < tempProblems.length; i++) {
        text += `${tempProblems[i].text}\n`;
      }
      setQesutionText(text);
      problem = tempProblems.splice(0, 1);
    } else if (typeMode === SHORT_TEXT || typeMode === REAL_TEXT) {
      problem = tempProblems.splice(0, 1);
      setQesutionText(problem![0].text);
    }

    isMore = true;
    convRomaText = romajiTypeSelect(problem![0].romaji as string);
    setRomajiText(convRomaText as string);
    setKanaText(problem![0].kana as string);
    convRomaText = romajiTypeSelect(problem![0].typingWords as string[][]);
    setTypingWord(convRomaText as string[][]);
    setProblems(tempProblems);
    setProblemCount((prev) => prev + 1);
    return isMore;
  };

  return {
    romajiText,
    kanaText,
    questionText,
    typingWord,
    questionMod,
    romajiMod,
    selectRetryProblem,
    problemCount,
    reloadProblem,
  };
};

export default useReloadProblem;
