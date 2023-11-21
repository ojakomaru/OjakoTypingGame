import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LONG_TEXT, SHOW, type TypingDataType } from "../../../@types";
import { useMissMessage } from "./useMissMessage";
import useReloadProblem from "./useReloadProblem";
import useRomajiTypedMove from "./useRomajiTypedMove";
import Romanizer from "./Romanizer";
import { SettingDataContext } from "../../../Contexts";
import {
  GameBoard,
  HiraganaText,
  RomajiText,
  QuestionText,
} from "../presentation";
import { Divider } from "@mui/material";
import useKanaTypedMove from "./useKanaTypedMove";

type PlayingGameProps = {
  setIsPlaying?: (a: boolean) => void;
  typingdata: TypingDataType;
};
export default function PlayingGame(props: PlayingGameProps) {
  const navigate = useNavigate();
  const { typingdata, setIsPlaying } = props;
  const { typeMode, showFurigana, romajiType } =
    React.useContext(SettingDataContext);
  const { romajiText, kanaText, questionText, typingWord, reloadProblem } =
    useReloadProblem(typingdata);
  // const kanaRef = useRef<HTMLParagraphElement>(null);
  const { romajiRef, romajiInit } = useRomajiTypedMove();
  const { kanaRef, kanaInit } = useKanaTypedMove();
  const [romaPos, setPosition] = useState<number>(0);
  const [kanaPos, setKanaPos] = useState(0);
  // const [typo, setTypo] = useState(new Array(0));
  const [scrollCount, scrollTrigger] = useState(0);
  // ミスした際のポップアップロジック
  const [missMessage, messageShow] = useMissMessage();
  // const romanizer = new Romanizer({
  //   upper: Romanizer.UPPER_ALL,
  // });

  // 問題文生成
  useEffect(() => {
    reloadProblem(typeMode, romajiType);
  }, []);

  /* タイピング入力処理 */
  useEffect(() => {
    const romajiTyped = romajiInit();
    const kanaTyped = kanaInit();
    let pattern = 0;
    document.onkeydown = function (e) {
      // スペースキーの挙動をキャンセル
      if (e.code === "Space") e.preventDefault();
      let hiragana = kanaRef.current!.children;
      // "Escape"キーの処理（タイマー、タイプカウントのリセット）
      if (e.key === "Escape") {
        setIsPlaying!(false);
        navigate("/");
      }
      console.log(typingWord[kanaPos][pattern]);
      // 正解時の処理
      if (e.key == typingWord[kanaPos][pattern][romaPos]) {
        console.log("正解");
        romajiTyped.success(romaPos);
        // まだ入力していない文字があるとき
        if (romaPos <= romajiText!.length - 2) {
          romajiTyped.next(romaPos);
          setPosition(romaPos + 1);
          // すべての文字を入力したとき
        } else {
          setPosition(0);
          setKanaPos(0);
          romajiTyped.reset();
          Array.from(hiragana).forEach((char) =>
            char.classList.remove("typed-letters")
          );
          let isProblem = reloadProblem(typeMode, romajiType);
          if (!isProblem) console.log("GameSet!!");
        }
      }
    };
    return () => {
      window.document.onkeydown = null;
    };
  });

  return (
    <GameBoard>
      {missMessage}
      {showFurigana === SHOW && ( // ふりがな表示がOnの時
        <HiraganaText ref={kanaRef} kanaText={kanaText} />
      )}
      {typeMode === LONG_TEXT ? ( // 長文モード時
        <>
          <RomajiText
            ref={romajiRef}
            romaji={romajiText}
            className="romajiLongMode"
          />
          <Divider
            variant="middle"
            sx={{ borderColor: "primary.main", width: "100%", height: "3px" }}
          />
          <QuestionText
            questionText={questionText}
            $longModeScrollOn={scrollCount}
          />
        </>
      ) : (
        <>
          <RomajiText ref={romajiRef} romaji={romajiText} />
          <QuestionText questionText={questionText} />
        </>
      )}
    </GameBoard>
  );
}
