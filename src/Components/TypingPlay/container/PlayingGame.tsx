import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Romanizer, useEffectOnce } from "../../../Hooks";
import { LONG_TEXT, SHOW, type TypingDataType } from "../../../@types";
import { SettingDataContext } from "../../../Contexts";
import {
  useReloadProblem,
  useRomajiTypedMove,
  useKanaTypedMove,
  useMissMessage,
} from "./hook";
import { Divider } from "@mui/material";
import {
  GameBoard,
  HiraganaText,
  RomajiText,
  QuestionText,
} from "../presentation";

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
  const tmpRef = useRef(""); // 再レンダリング対策
  const romaPosIdx = useRef(0); // 再レンダリング対策
  const kanaPosIdx = useRef(0); // 再レンダリング対策
  const romaIdx = useRef(0); // 再レンダリング対策
  const patternAry = useRef<number[]>(new Array(100).fill(0)); // 再レンダリング対策
  const [typo, setTypo] = useState(new Array(0));
  const [scrollCount, scrollTrigger] = useState(0);
  // ミスした際のポップアップロジック
  const [missMessage, messageShow] = useMissMessage();
  const romanizer = new Romanizer();

  // 問題文生成
  useEffectOnce(() => {
    reloadProblem(typeMode, romajiType);
  });

  /* タイピング入力処理 */
  useEffect(() => {
    const romajiTyped = romajiInit();
    const kanaTyped = kanaInit();
    let romaPos = romaPosIdx.current,
      kanaPos = kanaPosIdx.current,
      romaLength = romaIdx.current;
    let tmp = tmpRef.current;

    document.onkeydown = function (e) {
      /* typingWordがstateの為特別に以下で定義 */
      patternAry.current.splice(typingWord.length, 100 - typingWord.length);
      let pattern = patternAry.current;
      let missFlg = true;
      // スペースキーの挙動をキャンセル
      if (e.code === "Space") e.preventDefault();
      // "Escape"キーの処理（タイマー、タイプカウントのリセット）
      if (e.key === "Escape") {
        setIsPlaying!(false);
        navigate("/");
      }
      tmp += e.key;
      // ローマ字正解打の処理
      if (e.key === typingWord[kanaPos][pattern[kanaPos]][romaPos]) {
        romajiTyped.success(romaLength);
        romajiTyped.next(romaLength);
        romaLength++;
        romaPos++;
        missFlg = false;
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
        if (e.key === typingWord[kanaPos][pattern[kanaPos]][romaPos]) {
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
          romajiTyped.refresh(text.length);
          romaLength = text.length;
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
          romajiMod(text);
          romaPos++;
          romaPosIdx.current = romaPos;
          kanaPosIdx.current = kanaPos;
          romaIdx.current = romaLength;
          patternAry.current = pattern;
          tmpRef.current = tmp;
          missFlg = false;
        }
        // 打ち間違い判定
        else {
          if (e.key !== "Shift") {
            messageShow();
            // その位置で初めてのうち間違えであるとき
            if (typo.indexOf(romaLength) === -1) {
              // うち間違えた位置の配列にその位置を追加
              setTypo([...typo, romaLength]);
              romajiTyped.miss(romaLength);
            }
            kanaPosIdx.current = kanaPos;
            romaIdx.current = romaLength;
            patternAry.current = pattern;
            missFlg = true;
          }
        }
      }

      // ローマ字入力が完了している場合
      if (romaPos === typingWord[kanaPos][pattern[kanaPos]].length) {
        // かな文字が入力完了の場合
        let kanaStr = romanizer.romaToHira(
          typingWord[kanaPos][pattern[kanaPos]]
        );
        kanaTyped.success(kanaPos);
        if (romanizer.isWithSutegana(kanaStr, 0)) {
          kanaTyped.success(kanaPos + 1);
        }
        kanaPos++;
        romaPos = 0;
        tmp = "";
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
