import React from "react";
import { useCallback, useState } from "react";
import { ProblemType, REAL_TEXT } from "../../../../../@types";
import { SettingDataContext } from "../../../../../Contexts";
import { usePrevious } from "../../../../../Hooks";
import { useReloadProblem } from "../../../container/hook";

const useGameManager = (
  setIsPlaying: (a: boolean) => void,
  setIsStandby: (a: boolean) => void,
  problemsProps: ProblemType
) => {
  const [finished, setFinished] = useState(false);
  const [missCount, setMissCount] = useState(0); // ミスした回数
  const [typo, setTypo] = useState<Array<string>>([]); // タイプミス文字保管用
  const [problemOfMissCount, setProblemOfMissCount] = useState(0); // 問題文毎のミス回数
  const { ref } = usePrevious(problemOfMissCount); //ミス回数を前回のものと比較する
  const [missedProblems, setMissedProblems] = useState<Array<number>>([]); // タイプミス文章保管用
  const [totalType, setTotalType] = useState(0); // トータルタイピング数
  const [timeOfTyping, setTimeOfTyping] = useState(new Date().getTime()); //トータルタイム
  const [missFlg, setMissFlg] = useState(false); // ミスした際のポップアップロジック
  const { typeMode } = React.useContext(SettingDataContext);

  const {
    romajiText,
    kanaText,
    questionText,
    questionMod,
    selectRetryProblem,
    problemCount,
    reloadProblem,
  } = useReloadProblem(problemsProps);

  const resetState = useCallback(() => {
    setIsStandby(true);
    setMissFlg(false);
    setTotalType(0);
    setTimeOfTyping(new Date().getTime());
    setTypo([]);
    setMissCount(0);
    setProblemOfMissCount(0);
    setFinished(false);
    setIsPlaying(false);
  }, [setIsPlaying, setIsStandby]);

  const gameInit = useCallback(() => {
    reloadProblem();
  }, [reloadProblem]);

  // ミス内容を記録する関数
  const missRecode = (key: string) => {
    let time: number = 800;
    if (typeMode === REAL_TEXT) {
      key = " ";
      time = 100;
    }
    setMissFlg(true);
    setTimeout(function () {
      setMissFlg(false);
    }, time);
    // 打ち間違えた文字を追加
    setTypo((typo) => [...typo, key]);
    setMissCount((prev) => prev + 1);
  };

  // クリア後のもう一回リセット関数
  const retry = useCallback(() => {
    resetState();
    reloadProblem();
  }, [reloadProblem, resetState]);

  // クリア後のミスだけもう一回関数
  const missedOnlyRetry = useCallback(() => {
    resetState();
    let retryProblem = selectRetryProblem(missedProblems);
    retryProblem.length !== 0 ? reloadProblem(retryProblem) : reloadProblem();
    setMissedProblems([]);
  }, [missedProblems, reloadProblem, resetState]);

  // 文章を入力完了時の処理
  const typingConplate = (romajiTextLength: number, problemCount: number) => {
    setTotalType((prev) => prev + romajiTextLength);
    if (missCount > 0) {
      setProblemOfMissCount(missCount);
      if (missCount !== ref.current) {
        setMissedProblems([...missedProblems, problemCount]);
      }
    }
    let isProblem = reloadProblem();
    if (!isProblem) gameClear();
  };

  // ゲームクリア時の処理
  const gameClear = () => {
    setTotalType((prev) => prev + missCount);
    setTimeOfTyping((startTime) => new Date().getTime() - startTime);
    setFinished(true);
  };

  return {
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
    questionMod,
    problemCount,
  };
};
export default useGameManager;
