import { useEffect, useCallback, useState } from 'react';
import { ProblemType } from '../../../../../@types';
import { usePrevious } from '../../../../../Hooks';
import { useReloadProblem } from '../../../container/hook';

const useGameManager = (
  isRealPlay: boolean,
  isStandby: boolean,
  setIsStandby: (a: boolean) => void,
  problemsProps: ProblemType
) => {
  const [finished, setFinished] = useState(false);
  const [missCount, setMissCount] = useState(0); // ミスした回数
  const [typo, setTypo] = useState<Array<string>>([]); // タイプミス文字保管用
  const [problemOfMissCount, setProblemOfMissCount] = useState(0); // 問題文毎のミス回数
  const { ref } = usePrevious(problemOfMissCount); // ミス回数を前回のものと比較する
  const [missedProblems, setMissedProblems] = useState<Array<number>>([]); // タイプミス文章保管用
  const [totalType, setTotalType] = useState(0); // トータルタイピング数
  const [timeOfTyping, setTimeOfTyping] = useState(new Date().getTime()); // トータルタイム
  const [missFlg, setMissFlg] = useState(false); // ミスした際のフラグ
  const [tryagain, setIsTryagain] = useState(false); // やり直し中フラグ
  const [count, setCountdown] = useState(3);

  const {
    romajiText,
    kanaText,
    questionText,
    typingWord,
    questionMod,
    romajiMod,
    selectRetryProblem,
    problemCount,
    reloadProblem,
  } = useReloadProblem(problemsProps);

  const resetState = useCallback(() => {
    setCountdown(3);
    setMissFlg(false);
    setTotalType(0);
    setTimeOfTyping(new Date().getTime());
    setTypo([]);
    setMissCount(0);
    setProblemOfMissCount(0);
    setFinished(false);
  }, [setIsStandby]);

  useEffect(() => {
    const countDownInterval = setInterval(() => {
      if (count === 0) {
        clearInterval(countDownInterval);
      }
      if (!isStandby && count > 0) setCountdown(count - 1);
    }, 1000);
    return () => clearInterval(countDownInterval);
  }, [count, isStandby]);

  const gameInit = useCallback(() => {
    if (!tryagain) reloadProblem();
  }, [reloadProblem]);

  // ミス内容を記録する関数
  const missRecode = (key: string) => {
    let time: number = 800;
    if (isRealPlay) {
      // eslint-disable-next-line no-param-reassign
      key = ' ';
      time = 100;
    }
    setMissFlg(true);
    setTimeout(() => {
      setMissFlg(false);
    }, time);
    // 打ち間違えた文字を追加
    // eslint-disable-next-line @typescript-eslint/no-shadow
    setTypo((typo) => [...typo, key]);
    setMissCount((prev) => prev + 1);
  };

  // クリア後のもう一回リセット関数
  const retry = useCallback(() => {
    resetState();
    setIsTryagain(false);
    reloadProblem();
  }, [reloadProblem, resetState]);

  // クリア後のミスだけもう一回関数
  const missedOnlyRetry = useCallback(() => {
    resetState();
    setIsTryagain(true);
    const retryProblem = selectRetryProblem(missedProblems);
    if (retryProblem.length !== 0) {
      reloadProblem(retryProblem);
    } else {
      reloadProblem();
    }
    setMissedProblems([]);
  }, [missedProblems, reloadProblem, resetState]);

  // 文章を入力完了時の処理
  // ゲームクリア時の処理
  const gameClear = () => {
    setTotalType((prev) => prev + missCount);
    setTimeOfTyping((startTime) => new Date().getTime() - startTime - 3000);
    setFinished(true);
  };

  const typingConplate = (romajiTextLength: number, problemNumber: number) => {
    setTotalType((prev) => prev + romajiTextLength);
    if (missCount > 0) {
      setProblemOfMissCount(missCount);
      if (missCount !== ref.current) {
        setMissedProblems([...missedProblems, problemNumber]);
      }
    }
    const isProblem = reloadProblem();
    if (!isProblem) gameClear();
  };

  return {
    count,
    gameInit,
    missFlg,
    finished,
    missCount,
    typo,
    totalType,
    timeOfTyping,
    missRecode,
    retry,
    missedOnlyRetry,
    typingConplate,
    romajiText,
    kanaText,
    questionText,
    typingWord,
    romajiMod,
    questionMod,
    problemCount,
  };
};
export default useGameManager;
