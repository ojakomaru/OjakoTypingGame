import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { type TypingDataType } from '../../@types';
import { TypingDataContext } from '../../Contexts';
import { FormWrapper } from '../form/settingForm/presentation';
import Layout from '../layout/Layout';
import { AddTypingForm, UpdateTypingForm } from '../form';

const TypingForm: React.FC = () => {
  const typingID = useParams();
  const [modData, setModData] = useState<TypingDataType | undefined>(undefined);
  const { typingdatas } = React.useContext(TypingDataContext);
  useEffect(() => {
    if (Object.prototype.hasOwnProperty.call(typingID, 'id')) {
      const data = typingdatas.filter((item) => typingID.id === item.id);
      setModData(data[0]);
    }
  }, [typingID]);

  return (
    <Layout>
      <FormWrapper>{modData ? <UpdateTypingForm modData={modData} /> : <AddTypingForm />}</FormWrapper>
    </Layout>
  );
};

export default TypingForm;
