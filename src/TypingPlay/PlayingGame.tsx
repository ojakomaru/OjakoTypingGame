import React from "react";
import { useState, useEffect, useRef, ReactNode } from "react";
import { type TypingDataType } from "../@types/ModuleTypes";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// 引数の型指定
interface PlayingGameProps {
  typingdata: TypingDataType;
}

// 問題文のスタイリング
const problemStyle = css`
  text-align: center;
  min-height: 45vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  .gameboard {
    color: #2d0303;
    width: 80%;
    background-color: rgba(250, 250, 240, 0.8);
    font-size: calc(14px + 2vmin);
  }
  .current-letter {
    color: #2d0303;
    text-decoration: underline;
    animation: blink 1s linear infinite;
  }
  @keyframes blink {
    100% {
      text-decoration: none;
    }
  }
  .waiting-letters {
    color: #2d0303;
  }
  .typed-letters {
    color: #bcbbbb;
  }
  .typo {
    color: #f52727;
  }
`;

export default function PlayingGame(props: PlayingGameProps) {
  const { typingdata } = props;
  const navigate = useNavigate();
  const romajiRef = useRef<HTMLParagraphElement>(null);
  const questionRef = useRef<HTMLParagraphElement>(null);
  const kanaRef = useRef<HTMLParagraphElement>(null);
  // 問題をコピーしておく（破壊的な配列操作を行うため）
  const cpProblems = structuredClone(typingdata.problems);
  const [problems, setProblems] = useState(cpProblems);
  // 問題文の数
  const [problemLength, setProblemLength] = useState(problems.length);
  const [romajiText, setRomajiText] = useState<string | undefined>("");
  const [position, setPosition] = useState<number>(0);
  const [typo, setTypo] = useState(new Array(0));

  // 問題文生成
  useEffect(() => {
    reloadProblem();
  }, []);
  const reloadProblem = (): boolean => {
    if (problems.length == 0) return false;
    // 初期表示はランダムにする
    if (problemLength === problems.length) {
      const rnd = Math.floor(Math.random() * (problemLength - 1));
      const problem = problems.splice(rnd, 1);
      setRomajiText(problem[0].romazi);
      questionRef.current!.innerText = problem[0].text;
      kanaRef.current!.innerText = problem[0].kana as string;
    } else {
      const problem = problems.splice(0, 1);
      setRomajiText(problem[0].romazi);
      questionRef.current!.innerText = problem[0].text;
      kanaRef.current!.innerText = problem[0].kana as string;
    }
    setProblems(problems);
    return true;
  };

  /* タイピング入力処理 */
  useEffect(() => {
    document.onkeydown = function (e) {
      // スペースキーの挙動をキャンセル
      if (e.code === "Space") e.preventDefault();
      let inputText = romajiRef.current!.children;
      // "Escape"キーの処理（タイマー、タイプカウントのリセット）
      if (e.key === "Escape") {
        // ホーム画面とプレイ画面のフラグを変更
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
          // すべての文字を入力したとき
        } else {
          setPosition(0);
          inputText[0].classList.add("current-letter");
          Array.from(inputText).forEach((char) => {
            char.classList.remove("typed-letters");
            char.classList.remove("typo");
            char.classList.add("waiting-letters");
          });
          let isProblem = reloadProblem();
          if (!isProblem) console.log("GameSet!!");
        }

        // ミスした時の処理
      } else {
        if (e.key !== "Shift") {
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
    <Box css={problemStyle}>
      <div className="gameboard">
        <p ref={questionRef} id="questionText"></p>
        <p ref={kanaRef} id="hiraganaText"></p>
        <p ref={romajiRef} id="checkText" className="break-normal">
          <span className="current-letter">{romajiText![0]}</span>
          {romajiText!
            .split("")
            .slice(1)
            .map((char: string, index: number) => (
              <span className="waiting-letters" key={index}>
                {char}
              </span>
            ))}
        </p>
      </div>
    </Box>
  );
}
