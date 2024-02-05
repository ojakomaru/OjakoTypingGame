import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { showConfirmDialog } from '../../../Util';
import { TypingDataType } from '../../../@types';
import { TypingDataContext } from '../../../Contexts';
import { db } from '../../../Config';

interface DeleteButtonProps {
  deleteID: string;
}
const DeleteButton = ({ deleteID }: DeleteButtonProps) => {
  const { typingdatas, setTypingData, setTypingDatas } = React.useContext(TypingDataContext);
  const navigate = useNavigate();

  const deleteConfirmDialog = async () => {
    const confirmed = await showConfirmDialog('登録済みのタイピングデータを削除してもよろしいですか？', true);
    if (!confirmed) return;

    try {
      // タイピングIDを検索して元データから削除
      const docRef = doc(db, 'typingdatas', deleteID);
      await deleteDoc(docRef);
      // 削除後にStateとして保持しているデータも削除
      typingdatas.splice(
        typingdatas.findIndex((data: TypingDataType) => data.id === deleteID),
        1
      );
      setTypingDatas(typingdatas);
      setTypingData(typingdatas[Math.floor(Math.random() * typingdatas.length)]);
      navigate('/home');
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  return (
    <Button variant="outlined" onClick={deleteConfirmDialog}>
      このデータを削除
    </Button>
  );
};

export default DeleteButton;
