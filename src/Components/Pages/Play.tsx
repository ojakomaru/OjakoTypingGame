import React, { useState } from "react";
import Keyboard from "../TypingPlay/presentation/Keyboard";
import { MainDisplay } from "../MainDisplay/container/MainDisplay";
import Layout from "../layout/Layout";
import { SettingDataContext } from "../../Contexts";
import { SHOW } from "../../@types";
const Play: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { showKeyboard } = React.useContext(SettingDataContext);

  return (
    <Layout>
      <MainDisplay isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      {showKeyboard === SHOW && <Keyboard shiftOn={false} />}
    </Layout>
  );
};
export default Play;
