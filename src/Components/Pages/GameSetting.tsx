import React from "react";
import { useState } from "react";
import { MainDisplay } from "../MainDisplay/container/MainDisplay";
import Layout from "../layout/Layout";
import Keyboard from "../TypingPlay/presentation/Keyboard";
import SettingForm from "../form/settingForm/SettingForm";
import { SHOW } from "../../@types";
import { SettingDataContext } from "../../Contexts";
import { FormWrapper } from "../form/settingForm/presentation";

const GameSetting = (): JSX.Element => {
  const { showKeyboard } = React.useContext(SettingDataContext);
  const [isSetting, setIsSetting] = useState(true);
  return (
    <Layout>
      <MainDisplay isSetting={isSetting} />
      {showKeyboard === SHOW && <Keyboard inputKey="k" />}
      <FormWrapper isSetting>
        <SettingForm setIsSetting={setIsSetting} />
      </FormWrapper>
    </Layout>
  );
};

export default GameSetting;
