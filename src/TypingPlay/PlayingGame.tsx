import React from "react";
import { useState, useEffect } from "react";
import testdata from "../data/testdata.json";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// 引数の型指定
interface PlayingGameProps {
  problemNo: number;
}

// 問題文のスタイリング
const problemStyle = css`
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
  .typo {
    color: #f52727;
  }
  .waiting-letters {
    color: #2d0303;
  }
  .typed-letters {
    color: #bcbbbb;
  }
`;

const PlayingGame: React.FC<PlayingGameProps> = ({ problemNo }) => {
  const navigate = useNavigate();
  // 問題文生成
  let ProblemText = testdata.testdata.filter(
    (val) => parseInt(val.part) === problemNo
  );
  const rnd = Math.floor(Math.random() * ProblemText.length);
  const [japaneseQuestionText, setJapaneseQuestionText] = useState(
    ProblemText[rnd].japanese
  );
  const [correctText, setCorrectText] = useState("");
  const [checkText, setCheckText] = useState(ProblemText[rnd].text.split(""));
  const [position, setPosition] = useState(0);
  const [typo, setTypo] = useState(new Array(0));
  // タイピング処理
  useEffect(() => {
    document.onkeydown = function (event) {
      let inputText = document.getElementById("checkText")!.children;
      if (event.key === "Escape") {
        // "Escape"キーの処理（タイマー、タイプカウントのリセット）
        navigate("/");
      } else if (event.key === checkText[position]) {
        // 正解した時の処理
        setCorrectText(correctText + event.key);
        //現在の文字を入力済みとする
        inputText[position].classList.add("typed-letters");
        inputText[position].classList.remove("current-letter");
        // まだ入力していない文字があるとき
        if (position <= checkText.length - 2) {
          // 次の位置へ移動
          inputText[position + 1].className = "current-letter";
          setPosition(position + 1);
          //すべての文字を入力したとき
        } else {
          setJapaneseQuestionText(ProblemText[rnd].japanese);
          setPosition(0);
          setCheckText(ProblemText[rnd].text.split(""));
          inputText = document.getElementById("checkText")!.children;
          inputText[0].classList.add("current-letter");
          Array.from(inputText).map((char) => {
            char.classList.remove("typed-letters");
            char.classList.remove("typo");
            char.classList.add("waiting-letters");
            return null;
          });
        }
      } else {
        // ミスした時の処理
        if (event.key !== "Shift") {
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
  }, [correctText, checkText, position, typo]);

  // HTML
  return (
    <Box
      component="p"
      sx={{
        position: "relative",
        p: { xs: 3, md: 6 },
        pr: { md: 0 },
        textAlign: "center",
      }}
      css={problemStyle}
    >
      <div className="gameboard">
        <p id="japaneseQuestionText">{japaneseQuestionText}</p>
        <p id="checkText" className="break-normal">
          <span className="current-letter">{checkText[0]}</span>
          {checkText.slice(1).map((char) => (
            <span className="waiting-letters">{char}</span>
          ))}
        </p>
      </div>
    </Box>
  );
};

export default PlayingGame;
