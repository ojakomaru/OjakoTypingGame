import React from "react";
import { Button, type ButtonProps } from "@mui/material";

interface SubmitButtonProps extends ButtonProps {
  possible: string;
  unable: string;
  status: { isDirty: boolean; isValid: boolean };
}

const SubmitButton = (props: SubmitButtonProps) => {
  const { possible, unable, status, ...ButtonProps } = props;
  return (
    <Button
      variant="contained"
      type="submit"
      sx={{ mx: 1 }}
      disabled={!status.isDirty || !status.isValid}
      {...ButtonProps}
    >
      {status.isValid ? possible : unable}
    </Button>
  );
};

export default SubmitButton;
