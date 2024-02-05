import React, { ComponentPropsWithoutRef, forwardRef } from 'react';
import { FormControlLabelProps, FormControlLabel, useRadioGroup, styled } from '@mui/material';

type CustomFormControlLabelProps = ComponentPropsWithoutRef<'input'> & FormControlLabelProps;
interface StyledFormControlLabelProps extends CustomFormControlLabelProps {
  checked: boolean;
}
const StyledFormControlLabel = styled(
  // eslint-disable-next-line react/display-name
  forwardRef((props: StyledFormControlLabelProps, ref) => <FormControlLabel ref={ref} {...props} />)
)(({ theme, checked }) => ({
  '.MuiFormControlLabel-label': checked && {
    color: theme.palette.primary.main,
  },
}));
StyledFormControlLabel.displayName = 'StyledFormControlLabel';

const CustomFormControlLabel = forwardRef((props: CustomFormControlLabelProps, ref) => {
  const radioGroup = useRadioGroup();
  let checked = false;
  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }
  return <StyledFormControlLabel ref={ref} checked={checked} {...props} />;
});
CustomFormControlLabel.displayName = 'CustomFormControlLabel';

export { CustomFormControlLabel };
