import React from "react";
import { useState } from "react";
import { MainDisplay } from "../MainDisplay/container/MainDisplay";
import Layout from "../layout/Layout";
import SettingForm from "../form/SettingForm";
import { SettingDataContext } from "../../Contexts";
import { FormWrapper } from "../form/settingForm/presentation";
import { Keyboard } from "../TypingPlay/presentation";

const GameSetting = (): JSX.Element => {
  const { showKeyboard } = React.useContext(SettingDataContext);
  const [isSetting, setIsSetting] = useState(true);
  return (
    <Layout>
      <FormWrapper isSetting>
        <SettingForm setIsSetting={setIsSetting} />
      </FormWrapper>
      {/* MissMessageのマスクで操作不能になっていたので保留処置 */}
      {/* <MainDisplay isSetting={isSetting} /> */}
      {/* <Keyboard $showKeyboard={showKeyboard} /> */}
    </Layout>
  );
};

export default GameSetting;
