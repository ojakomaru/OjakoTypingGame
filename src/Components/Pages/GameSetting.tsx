import React, { useContext, useState } from "react";
import Layout from "../layout/Layout";
import SettingForm from "../form/SettingForm";
import { SettingDataContext, TypingDataContext } from "../../Contexts";
import { FormWrapper } from "../form/settingForm/presentation";
import { Keyboard } from "../TypingPlay/presentation";
import MainDisplayLayout from "../layout/MainDisplayLayout";
import { SettingExample } from "../MainDisplay/presentation";

const GameSetting = (): JSX.Element => {
  const { showKeyboard } = React.useContext(SettingDataContext);
  const { typingdata } = useContext(TypingDataContext);
  const [isSetting, setIsSetting] = useState(true);
  return (
    <Layout>
      <FormWrapper isSetting={isSetting}>
        <SettingForm setIsSetting={setIsSetting} />
      </FormWrapper>
      <MainDisplayLayout>
        {/* MissMessageのマスクで操作不能になっていたので保留処置 */}
        {/* <SettingExample typingdata={typingdata} /> */}
      </MainDisplayLayout>
      <Keyboard $showKeyboard={showKeyboard} />
    </Layout>
  );
};

export default GameSetting;
