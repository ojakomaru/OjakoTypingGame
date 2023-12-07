import React, { useState, useRef } from "react";
import { MainDisplay } from "../MainDisplay/container/MainDisplay";
import Layout from "../layout/Layout";
import { useKeyboardTyping } from "../TypingPlay/container/hook";
import { SettingDataContext } from "../../Contexts";
import { Keyboard } from "../TypingPlay/presentation";
const Play: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { showKeyboard } = React.useContext(SettingDataContext);
  const { keyboardRef, keyboardInit } = useKeyboardTyping();
  const keyRef = useRef<HTMLDivElement>(null);
  return (
    <Layout>
      <MainDisplay
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        keyboardInit={keyboardInit}
      />
      <Keyboard ref={keyRef} $showKeyboard={showKeyboard} />
    </Layout>
  );
};
export default Play;
