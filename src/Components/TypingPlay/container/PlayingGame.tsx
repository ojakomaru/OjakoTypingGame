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
  const {
    romajiText,
    kanaText,
    questionText,
    typingWord,
    romajiMod,
    reloadProblem,
  } = useReloadProblem(typingdata);
  const { romajiRef, romajiInit } = useRomajiTypedMove();
  const { kanaRef, kanaInit } = useKanaTypedMove();
  const romaPosIdx = useRef(0);
  const kanaPosIdx = useRef(0);
  const romaIdx = useRef(0);
  console.log(typingWord.length);
  const patternAry = useRef(new Array(typingWord.length).fill(0));
  // const [pattern, setPattern] = useState(new Array(0));
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
    let romaPos = romaPosIdx.current,
      kanaPos = kanaPosIdx.current,
      romaLength = romaIdx.current;
    let tmp = "";
    let pattern = new Array(typingWord.length).fill(0);

    document.onkeydown = function (e) {
      // スペースキーの挙動をキャンセル
      if (e.code === "Space") e.preventDefault();
      // "Escape"キーの処理（タイマー、タイプカウントのリセット）
      if (e.key === "Escape") {
        setIsPlaying!(false);
        navigate("/");
      }
      tmp += e.key;
      // ローマ字正解打の処理
      if (e.key == typingWord[kanaPos][pattern[kanaPos]][romaPos]) {
        romajiTyped.success(romaLength);
        romajiTyped.next(romaLength);
        romaLength++;
        romaPos++;
      }
      // 目的のキーでなければpattern[kanaPos]を検索
      else {
        let reg = new RegExp("^" + tmp);
        for (let i = 0; i < typingWord[kanaPos].length; i++) {
          if (!!typingWord[kanaPos][i].match(reg)) {
            pattern[kanaPos] = i;
            break;
          }
        }
        // パターン変更後のローマ字の判定
        if (e.key == typingWord[kanaPos][pattern[kanaPos]][romaPos]) {
          let inputText = romajiRef.current!.children;
          inputText[romaLength].classList.remove("current-letter");
          let text = "";
          if (kanaPos > 0) {
            for (let i = 0; i < kanaPos; i++) {
              inputText[i].classList.add("typed-letters");
              text += typingWord[i][pattern[i]];
            }
          }
          for (let i = 0; i <= romaPos; i++) {
            text += typingWord[kanaPos][pattern[kanaPos]][i];
          }
          inputText[text.length].className = "current-letter";
          romaLength = text.length;
          for (
            let i = romaPos + 1;
            i < typingWord[kanaPos][pattern[kanaPos]].length;
            i++
          ) {
            text += typingWord[kanaPos][pattern[kanaPos]][i];
          }
          for (let i = kanaPos + 1; i < typingWord.length; i++) {
            text += typingWord[i][pattern[i]];
          }
          romajiMod(text);
          romaPos++;
          romaPosIdx.current = romaPos;
          kanaPosIdx.current = kanaPos;
          romaIdx.current = romaLength;
          patternAry.current = pattern;
        }
      }
      // かな文字が入力完了の場合
      if (romaPos == typingWord[kanaPos][pattern[kanaPos]].length) {
        kanaTyped.success(kanaPos);
        kanaPos++;
        romaPos = 0;
        tmp = "";
        console.log("kana正解");
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
