import React from 'react'
import { Button } from '@mui/material';

interface ResetButtonProps {
  resetFunc: () => void
}
const ResetButton = ({resetFunc}: ResetButtonProps) => {
  return (
    <Button
      variant="outlined"
      onClick={resetFunc}
    >
      リセット
    </Button>
  );
}

export default ResetButton