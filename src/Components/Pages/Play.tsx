import React, { useState } from "react";
import { MainDisplay } from "../MainDisplay/container/MainDisplay";
import Layout from "../layout/Layout";
import { useKeyboardTyping } from "../TypingPlay/container/hook";
import { SettingDataContext } from "../../Contexts";
import { Keyboard } from "../TypingPlay/presentation";

const Play: React.FC = () => {
  const { showKeyboard } = React.useContext(SettingDataContext);
  const { keyboardRef, keyboardInit } = useKeyboardTyping();
  return (
    <Layout>
      <MainDisplay
        keyboardInit={keyboardInit}
      />
      <Keyboard ref={keyboardRef} $showKeyboard={showKeyboard} />
    </Layout>
  );
};
export default Play;
