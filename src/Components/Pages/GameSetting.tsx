import { useState } from "react";
import { MainDisplay } from "../MainDisplay/container/MainDisplay";
import Layout from "../layout/Layout";
import Keyboard from "../TypingPlay/presentation/Keyboard";
import SettingForm from "../form/settingForm/SettingForm";

const GameSetting = (): JSX.Element => {
  const [isSetting, setIsSetting] = useState(true);
  return (
    <Layout>
      <MainDisplay isSetting={isSetting} />
      <Keyboard inputKey="k" />
      <SettingForm setIsSetting={setIsSetting} />
    </Layout>
  );
};

export default GameSetting;
