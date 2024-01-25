import { Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { showConfirmDialog } from '../../../Hooks';

interface CancelButtonProps {
  isDirty: boolean;
}
const CancelButton = ({isDirty}: CancelButtonProps) => {
  const navigate = useNavigate();
  const cancelConfirmDialog = async () => {
    if (isDirty) {
      const confirmed = await showConfirmDialog(
        "行った変更が保存されませんがよろしいですか？",
        true
      );
      if (!confirmed) return;
      navigate("/home");
    } else {
      navigate("/home");
    }
  };
  return (
    <Button variant="outlined" onClick={cancelConfirmDialog}>
      キャンセル
    </Button>
  );
}

export default CancelButton