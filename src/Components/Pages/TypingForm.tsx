import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { type TypingDataType } from "../../@types";
import { TypingDataContext } from "../../Contexts";
import { FormWrapper } from "../form/settingForm/presentation";
import Layout from "../layout/Layout";
import { useEffectOnce } from "../../Hooks";
import { AddTypingForm, UpdateTypingForm } from "../form";

const TypingForm: React.FC = () => {
  const typingID = useParams();
  const [modData, setModData] = useState<TypingDataType | undefined>(undefined);
  const { typingdatas } = React.useContext(TypingDataContext);
  useEffectOnce(() => {
    if (typingID.hasOwnProperty("id")) {
      let data = typingdatas.filter((data) => typingID.id === data.id);
      setModData(data[0]);
    }
  });

  return (
    <Layout>
      <FormWrapper>
        {modData ? <UpdateTypingForm modData={modData} /> : <AddTypingForm />}
      </FormWrapper>
    </Layout>
  );
};

export default TypingForm;
