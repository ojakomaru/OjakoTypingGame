import React from "react";
import { useState, useEffect, useRef } from "react";
import { SHOW, type TypingDataType } from "../../../@types";
import { RomajiText } from "../presentation/RomajiText";
import { HiraganaText } from "../presentation/HiraganaText";
import { useNavigate } from "react-router-dom";
import { QuestionText } from "../presentation/QuestionText";
import { useMissMessage } from "./useMissMessage";
import useReloadProblem from "./useReloadProblem";
import GameBoard from "../presentation/GameBoard";
import Romanizer from "./Romanizer";
import { SettingDataContext } from "../../../Contexts";

type PlayingGameProps = {
  setIsPlaying?: (a: boolean) => void;
  typingdata: TypingDataType;
};
export default function PlayingGame(props: PlayingGameProps) {
  const { typingdata, setIsPlaying } = props;
  const navigate = useNavigate();
  const {
    typeMode,
    showFurigana,
    romajiType,
    showKeyboard,
  } = React.useContext(SettingDataContext);
  const romajiRef = useRef<HTMLParagraphElement>(null);
  const kanaRef = useRef<HTMLParagraphElement>(null);
  const [romajiText, kanaText, questionText, reloadProblem] =
    useReloadProblem(typingdata);
  const [position, setPosition] = useState<number>(0);
  const [kanaPos, setKanaPos] = useState(0);
  const [typo, setTypo] = useState(new Array(0));
  // ミスした際のポップアップロジック
  const [missMessage, messageShow] = useMissMessage();
  const romanizer = new Romanizer({
    mapping: Romanizer.MAPPING_KUNREI,
    chouon: Romanizer.CHOUON_ALPHABET,
    upper: Romanizer.UPPER_ALL,
  });

  // 問題文生成
  useEffect(() => {
    reloadProblem();
  }, []);

  /* タイピング入力処理 */
  useEffect(() => {
    document.onkeydown = function (e) {
      // スペースキーの挙動をキャンセル
      if (e.code === "Space") e.preventDefault();
      let inputText = romajiRef.current!.children;
      let hiragana = kanaRef.current!.children;
      // "Escape"キーの処理（タイマー、タイプカウントのリセット）
      if (e.key === "Escape") {
        setIsPlaying!(false);
        navigate("/");
        // 正解時の処理
      } else if (e.key.toUpperCase() === romajiText![position]) {
        // 正解時現在の文字を入力済みとする
        inputText[position].classList.add("typed-letters");
        inputText[position].classList.remove("current-letter");

        // まだ入力していない文字があるとき
        if (position <= romajiText!.length - 2) {
          // 次の位置へ移動
          inputText[position + 1].className = "current-letter";
          setPosition(position + 1);
          hiragana[kanaPos].classList.add("typed-letters");

          let isKanaMove: number = romanizer.isKanaMove(
            kanaText![kanaPos],
            romajiText!,
            position
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
          inputText[0].classList.add("current-letter");
          Array.from(inputText).forEach((char) => {
            char.classList.remove("typed-letters");
            char.classList.remove("typo");
            char.classList.add("waiting-letters");
          });
          Array.from(hiragana).forEach((char) =>
            char.classList.remove("typed-letters")
          );
          let isProblem = reloadProblem();
          if (!isProblem) console.log("GameSet!!");
        }

        // ミスした時の処理
      } else {
        if (e.key !== "Shift") {
          messageShow();
          // その位置で初めてのうち間違えであるとき
          if (typo.indexOf(position) === -1) {
            // うち間違えた位置の配列にその位置を追加
            setTypo([...typo, position]);
            // 打ち間違えた文字であることを示すclassを追加
            inputText[position].classList.add("typo");
          }
        }
      }
    };
    return () => {
      window.document.onkeydown = null;
    };
  });

  // HTML
  return (
    <GameBoard>
      {missMessage}
      {showFurigana  === SHOW && <HiraganaText ref={kanaRef} kanaText={kanaText} />}
      <QuestionText questionText={questionText} />
      <RomajiText ref={romajiRef} romaji={romajiText} />
    </GameBoard>
  );
}
