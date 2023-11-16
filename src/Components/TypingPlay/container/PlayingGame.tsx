import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LONG_TEXT, SHOW, type TypingDataType } from "../../../@types";
import { useMissMessage } from "./useMissMessage";
import useReloadProblem from "./useReloadProblem";
import useRomajiTypedMove from "./useRomajiTypedMove";
import Romanizer from "./Romanizer";
import { SettingDataContext } from "../../../Contexts";
import { GameBoard, HiraganaText, RomajiText, QuestionText } from "../presentation";

type PlayingGameProps = {
  setIsPlaying?: (a: boolean) => void;
  typingdata: TypingDataType;
};
export default function PlayingGame(props: PlayingGameProps) {
  const { typingdata, setIsPlaying } = props;
  const navigate = useNavigate();
  const { typeMode, showFurigana, romajiType, showKeyboard } =
    React.useContext(SettingDataContext);
  const kanaRef = useRef<HTMLParagraphElement>(null);
  const { romajiText, kanaText, questionText, reloadProblem } =
    useReloadProblem(typingdata, );
  const [romaPos, setPosition] = useState<number>(0);
  const { romajiRef, romajiInit } = useRomajiTypedMove();
  const [kanaPos, setKanaPos] = useState(0);
  const [typo, setTypo] = useState(new Array(0));
  const [scrollCount, scrollTrigger] = useState(0);
  // ミスした際のポップアップロジック
  const [missMessage, messageShow] = useMissMessage();
  const romanizer = new Romanizer({
    mapping: Romanizer.MAPPING_KUNREI,
    chouon: Romanizer.CHOUON_ALPHABET,
    upper: Romanizer.UPPER_ALL,
  });

  // 問題文生成
  useEffect(() => {
    reloadProblem(typeMode, romajiType);
  }, []);

  /* タイピング入力処理 */
  useEffect(() => {
    const romajiTyped = romajiInit();
    document.onkeydown = function (e) {
      // スペースキーの挙動をキャンセル
      if (e.code === "Space") e.preventDefault();
      let hiragana = kanaRef.current!.children;
      // "Escape"キーの処理（タイマー、タイプカウントのリセット）
      if (e.key === "Escape") {
        setIsPlaying!(false);
        navigate("/");
      }
      // 正解時の処理
      if (e.key.toUpperCase() === romajiText![romaPos]) {
        romajiTyped.success(romaPos);

        // まだ入力していない文字があるとき
        if (romaPos <= romajiText!.length - 2) {
          romajiTyped.next(romaPos);
          setPosition(romaPos + 1);
          hiragana[kanaPos].classList.add("typed-letters");

          let isKanaMove: number = romanizer.isKanaMove(
            kanaText![kanaPos],
            romajiText!,
            romaPos
          );
          switch (isKanaMove) {
            case 2:
              hiragana[kanaPos].classList.add("typed-letters");
              hiragana[kanaPos + 1].classList.add("typed-letters");
              setKanaPos(kanaPos + isKanaMove);
              break;
            case 1:
              hiragana[kanaPos].classList.add("typed-letters");
              setKanaPos(kanaPos + isKanaMove);
              break;
            case 0:
              hiragana[kanaPos].classList.remove("typed-letters");
              break;
          }
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

      // ミスした時の処理
      } else {
        if (e.key !== "Shift") {
          messageShow();
          // その位置で初めてのうち間違えであるとき
          if (typo.indexOf(romaPos) === -1) {
            // うち間違えた位置の配列にその位置を追加
            setTypo([...typo, romaPos]);
            romajiTyped.miss(romaPos);
          }
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
      {showFurigana === SHOW && (
        <HiraganaText ref={kanaRef} kanaText={kanaText} />
      )}
      <RomajiText ref={romajiRef} romaji={romajiText} />
      {typeMode === LONG_TEXT ? (
        <QuestionText
          questionText={questionText}
          longTextMode
          scrollOn={scrollCount}
        />
      ) : (
        <QuestionText questionText={questionText} />
      )}
    </GameBoard>
  );
}
