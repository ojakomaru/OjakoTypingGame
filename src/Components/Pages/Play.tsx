import React, { useState } from "react";
import { MainDisplay } from "../MainDisplay/container/MainDisplay";
import Layout from "../layout/Layout";
import { useKeyboardTyping } from "../TypingPlay/container/hook";
import { SettingDataContext, TypingDataContext } from "../../Contexts";
import { Keyboard } from "../TypingPlay/presentation";
import QuestionBox from "../QuestionBox/QuestionBox";
import { REAL_TEXT } from "../../@types";
import RealTextInput from "../TypingPlay/RealTyping/RealTextInput";
import RealTypingGame from "../TypingPlay/RealTyping/RealTypingGame";

const Play: React.FC = () => {
  const { typeMode, showKeyboard } = React.useContext(SettingDataContext);
  const { keyboardRef, keyboardInit } = useKeyboardTyping();
  const { typingdata } = React.useContext(TypingDataContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRealPlay] = useState(typeMode === REAL_TEXT);
  return (
    <Layout>
      {!isRealPlay ? (
        <>
          <MainDisplay
            keyboardInit={keyboardInit}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
          {isPlaying && (
            <Keyboard ref={keyboardRef} $showKeyboard={showKeyboard} />
          )}{" "}
          {!isPlaying && <QuestionBox problems={typingdata.problems} />}
        </>
      ) : (
        <RealTypingGame />
      )}
    </Layout>
  );
};
export default Play;
