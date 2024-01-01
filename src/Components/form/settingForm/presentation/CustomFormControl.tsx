import React, { ReactNode } from "react";
import { FormControl, styled } from "@mui/material";

const StyledRadioForm = styled(FormControl)(() => ({
  fontWeight: "bold",
  fontSize: 18,
}));

function CustomFormControl({ children }: { children: ReactNode }) {
  return (
    <StyledRadioForm>
      {children}
    </StyledRadioForm>
  );
}

export default CustomFormControl;
