import React, { useState } from "react";
import Keyboard from "../TypingPlay/presentation/Keyboard";
import { MainDisplay } from "../MainDisplay/container/MainDisplay";
import Layout from "../layout/Layout";

const Play: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Layout>
      <MainDisplay
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <Keyboard inputKey="k" />
    </Layout>
  );
};
export default Play;
