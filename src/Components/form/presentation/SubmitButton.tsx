import React from 'react'
import { Button } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { TypingDataType } from '../../../@types';

interface SubmitButtonProps {
  possible: string;
  unable: string;
  methods: UseFormReturn<TypingDataType, any, undefined>;
}

const SubmitButton = (props: SubmitButtonProps) => {
  const {possible, unable, methods} = props;
  return (
    <Button
      variant="contained"
      type="submit"
      sx={{ mx: 1 }}
      disabled={!methods.formState.isDirty || !methods.formState.isValid}
    >
      {methods.formState.isValid ? possible : unable}
    </Button>
  );
}

export default SubmitButton