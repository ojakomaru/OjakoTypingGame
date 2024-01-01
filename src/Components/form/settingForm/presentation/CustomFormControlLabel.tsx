import React from "react";
import {
  FormControlLabelProps,
  FormControlLabel,
  useRadioGroup,
  styled,
} from "@mui/material";
import { ComponentPropsWithoutRef, forwardRef } from "react";

type CustomFormControlLabelProps = ComponentPropsWithoutRef<"input"> &
  FormControlLabelProps;
interface StyledFormControlLabelProps extends CustomFormControlLabelProps {
  checked: boolean;
}
const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  ".MuiFormControlLabel-label": checked && {
    color: theme.palette.primary.main,
  },
}));

const CustomFormControlLabel = forwardRef(
  (props: CustomFormControlLabelProps, ref) => {
    const radioGroup = useRadioGroup();
    let checked = false;
    if (radioGroup) {
      checked = radioGroup.value === props.value;
    }
    return <StyledFormControlLabel ref={ref} checked={checked} {...props} />;
  }
);

export { CustomFormControlLabel };
