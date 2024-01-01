import React, { useCallback } from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Romanizer, useEffectOnce, usePrevious } from "../../../Hooks";
import { LONG_TEXT, type TypingDataType } from "../../../@types";
import { SettingDataContext } from "../../../Contexts";
import { useReloadProblem, useRomajiTypedMove, useKanaTypedMove } from "./hook";
import { Box, Divider, Typography } from "@mui/material";
import {
  GameBoard,
  HiraganaText,
  RomajiText,
  QuestionText,
  GameTimer,
} from "../presentation";
import ResultScore from "../../Score/container/ResultScore";

type PlayingGameProps = {
  typingdata: TypingDataType;
  setIsPlaying?: (a: boolean) => void;
  keyboardInit?: any;
};
export default function PlayingGame(props: PlayingGameProps) {
  const { typingdata, setIsPlaying, keyboardInit } = props;
  const [finished, setFinished] = useState(false);
  const { typeMode, showFurigana, romajiType, order } =
    React.useContext(SettingDataContext);
  const {
    romajiText,
    kanaText,
    questionText,
    typingWord,
    romajiMod,
    reloadProblem,
  } = useReloadProblem(typingdata.problems);
  const { romajiRef, romajiInit } = useRomajiTypedMove();
  const { kanaRef, kanaInit } = useKanaTypedMove();
  const tmpRef = useRef(""); // 再レンダリング対策
  const romaPosIdx = useRef(0); // 再レンダリング対策
  const kanaPosIdx = useRef(0); // 再レンダリング対策
  const romaIdx = useRef(0); // 再レンダリング対策
  const kanaIdx = useRef(0); // 再レンダリング対策
  const patternAry = useRef<number[]>(new Array(100).fill(0)); // 再レンダリング対策
  const [missFlg, setMissFlg] = useState(false); // ミスした際のポップアップロジック
  const [missCount, setMissCount] = useState(0); // ミスした回数
  const [typo, setTypo] = useState<Array<string>>([]); // タイプミス文字保管用

  const [typoPosition, setTypoPosition] = useState<Array<number>>(Array(0)); // タイプミス場所保管用
  const [problemCount, setProblemCount] = useState(1); //問題数
  const [missedProblems, setMissedProblems] = useState<Array<boolean>>([]); // タイプミス文章保管用
  const { ref, prev } = usePrevious(missedProblems);
  
  const [totalType, setTotalType] = useState(0); // トータルタイピング数
  const [timeOfTyping, setTimeOfTyping] = useState(new Date().getTime()); //トータルタイム
  const navigate = useNavigate();
  const romanizer = new Romanizer();
  const keyboard = keyboardInit();

  // 問題文生成
  useEffectOnce(() => {
    reloadProblem(typeMode, romajiType, order);
    if (!!romajiText[0]) keyboard.selActive(romajiText[0]);
  });
  // 問題文の更新時に最初のキーを色付けする
  useEffect(() => {
    if (!!romajiText[0]) keyboard.selActive(romajiText[0]);
  }, [questionText]);

  // クリア後のリセット関数
  const retry = useCallback(() => {
    setIsPlaying!(false);
    setFinished(false);
  }, [finished]);

  const missedRetry = useCallback(() => {
    setFinished(false);
    setTotalType(0);
    setTimeOfTyping(new Date().getTime());
    setTypo([]);
    setMissCount(0);
  }, []);

  /* タイピング入力処理 */
  useEffect(() => {
    if (finished) return;
    const romajiTyped = romajiInit();
    const kanaTyped = kanaInit();
    let romaPos = romaPosIdx.current,
      kanaPos = kanaPosIdx.current,
      romaLength = romaIdx.current,
      kanaLength = kanaIdx.current;
    let tmp = tmpRef.current;

    document.onkeydown = function (e) {
      /* typingWordがstateの為特別に以下で定義 */
      patternAry.current.splice(typingWord.length, 100 - typingWord.length);
      let pattern = patternAry.current;
      let nFlag = false;

      function saveRefs() {
        romaPosIdx.current = romaPos;
        kanaPosIdx.current = kanaPos;
        romaIdx.current = romaLength;
        kanaIdx.current = kanaLength;
        patternAry.current = pattern;
        tmpRef.current = tmp;
      }
      function missTyped(key: string) {
        setMissFlg(true);
        setTimeout(function () {
          setMissFlg(false);
        }, 800);
        // 打ち間違えた文字を追加
        setTypo((typo) => [...typo, key]);
        romajiTyped.miss(romaLength);
        kanaTyped.miss(kanaLength);
        tmp = tmp.slice(0, -1);
        saveRefs();
      }

      // スペースキーの挙動をキャンセル
      if (e.code === "Space") e.preventDefault();

      // "Escape"キーでPlay画面を抜ける
      if (e.key === "Escape") {
        setIsPlaying!(false);
        navigate("/");
      }
      if (e.key.length > 1) return;
      if (missFlg) return;
      tmp += e.key;
      // ローマ字正解打
      if (e.key === typingWord[kanaPos][pattern[kanaPos]][romaPos]) {
        romajiTyped.success(romaLength);
        romaLength++;
        romaPos++;
      } else {
        // 目的のキーでなければpattern[kanaPos]を検索
        if (!tmp.match(/[ -/:-@[-`/{-~]/)) {
          let reg = new RegExp("^" + tmp);
          for (let i = 0; i < typingWord[kanaPos].length; i++) {
            if (!!typingWord[kanaPos][i].match(reg)) {
              pattern[kanaPos] = i;
              break;
            }
          }
        }
        // パターン変更後に再チェック
        if (e.key === typingWord[kanaPos][pattern[kanaPos]][romaPos]) {
          romaLength = romajiMod(kanaPos, pattern, romaPos);
          romajiTyped.refresh(romaLength);
          romaPos++;
          saveRefs();
        } else {
          //「ん」の時の特別措置
          if (
            typingWord[kanaPos][pattern[kanaPos]] === "nn" &&
            typingWord[kanaPos].length === 3
          ) {
            for (let i = 0; i < typingWord[kanaPos + 1].length; i++) {
              if (e.key === typingWord[kanaPos + 1][i][0]) {
                pattern[kanaPos] = 2;
                pattern[kanaPos + 1] = i;
                nFlag = true;
                break;
              }
            }
            // 「ん」の次の文字を打ち間違えた時
            if (!nFlag) {
              missTyped(typingWord[kanaPos][pattern[kanaPos]][romaPos]);
              setMissCount((prev) => prev + 1);
            }
          }
          // 該当パターンなし、「ん」でもない時は打ち間違い
          else {
            if (e.key !== "Shift") {
              missTyped(typingWord[kanaPos][pattern[kanaPos]][romaPos]);
              setMissCount((prev) => prev + 1);
            }
          }
        }
      }

      // まだ入力していない文字があるとき
      if (romaLength <= romajiText.length - 1) {
        romajiTyped.next(romaLength - 1);
        // ローマ字入力が完了している場合
        if (romaPos === typingWord[kanaPos][pattern[kanaPos]].length) {
          let kanaStr = romanizer.romaToHira(
            typingWord[kanaPos][pattern[kanaPos]]
          );
          kanaTyped.success(kanaLength);
          // 「ん」を省略しつつ次の文字が正解打の場合
          if (nFlag) {
            romaLength = romajiMod(kanaPos, pattern, 0);
            romaLength++;
            romajiTyped.refresh(romaLength);
            kanaPos++;
            kanaLength++;
            // 正解打の次の文字が日本語ローマ字の場合
            if (typingWord[kanaPos][pattern[kanaPos]].length > 1) {
              romaPos = 1;
            } else {
              romaPos = 0;
              kanaPos++;
            }
            keyboard.selActive(typingWord[kanaPos][pattern[kanaPos]][romaPos]);
            tmp = tmp.slice(1);
            saveRefs();
          } else {
            if (
              romanizer.isWithSutegana(kanaStr, 0) ||
              kanaStr.includes("っ")
            ) {
              kanaLength++;
              kanaTyped.success(kanaLength);
            }
            kanaPos++;
            kanaLength++;
            romaPos = 0;
            keyboard.selActive(typingWord[kanaPos][pattern[kanaPos]][romaPos]);
            tmp = "";
          }
        } else {
          keyboard.selActive(typingWord[kanaPos][pattern[kanaPos]][romaPos]);
        }
        // すべての文字を入力したとき
      } else {
        romajiTyped.reset();
        kanaTyped.reset();
        romaPosIdx.current = 0;
        kanaPosIdx.current = 0;
        romaIdx.current = 0;
        kanaIdx.current = 0;
        patternAry.current = new Array(100).fill(0);
        tmpRef.current = "";
        setTotalType((prev) => prev + romajiText.length);
        let isProblem = reloadProblem(typeMode, romajiType, order);
        if (!isProblem) {
          setTotalType((prev) => prev + missCount);
          setTimeOfTyping((startTime) => new Date().getTime() - startTime);
          setFinished(true);
        }
      }
    };
    return () => {
      window.document.onkeydown = null;
    };
  });

  return (
    <React.Fragment>
      {finished ? (
        <ResultScore
          totalType={totalType}
          missCount={missCount}
          typo={typo}
          timeOfTyping={timeOfTyping}
          retry={retry}
          missedRetry={missedRetry}
        />
      ) : (
        <GameBoard miss={missFlg}>
          <Box display="flex" justifyContent="flex-end">
            <Typography>ミスタイプ: {missCount}回</Typography>
            <GameTimer />
          </Box>
          {typeMode === LONG_TEXT ? ( // 長文モード時
            <>
              <HiraganaText
                ref={kanaRef}
                kanaText={kanaText}
                $showFurigana={showFurigana}
                className="hiraganaLongMode"
              />
              <RomajiText
                ref={romajiRef}
                romaji={romajiText}
                className="romajiLongMode"
              />
              <Divider
                variant="middle"
                sx={{
                  borderColor: "primary.main",
                  width: "100%",
                  height: "3px",
                }}
              />
              <QuestionText
                questionText={questionText}
                $longMode={typeMode === LONG_TEXT}
              />
            </>
          ) : (
            <>
              <HiraganaText
                ref={kanaRef}
                kanaText={kanaText}
                $showFurigana={showFurigana}
              />
              <QuestionText questionText={questionText} />
              <RomajiText ref={romajiRef} romaji={romajiText} />
            </>
          )}
        </GameBoard>
      )}
    </React.Fragment>
  );
}
