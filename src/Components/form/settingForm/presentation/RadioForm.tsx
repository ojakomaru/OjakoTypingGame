import React, { useState } from "react";
import { FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { RadioGroupProps } from "@mui/material";
import { Options, Option } from "../../../../@types";
import StyledRadioForm from "./StyledRadioForm";

type RadioProps = {
  radioGroupProps: RadioGroupProps;
  options: Options<string>;
  label?: string;
  setFunc: any;
};

export const RadioForm = (props: RadioProps) => {
  const { radioGroupProps, options, label, setFunc } = props;
  const [checked, setSelectedValue] = useState(radioGroupProps.defaultValue);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFunc(event.target.value);
    setSelectedValue(event.target.value);
  };

  return (
    <StyledRadioForm>
      {label ?? <FormLabel>{label}</FormLabel>}
      <RadioGroup {...radioGroupProps} onChange={handleChange}>
        {options.map((radio: Option<string>) => (
          <FormControlLabel
            key={radio.value}
            label={radio.label}
            value={radio.value}
            control={<Radio />}
            sx={{
              color: checked === radio.value ? "primary.main" : "inherit",
            }}
          />
        ))}
      </RadioGroup>
    </StyledRadioForm>
  );
};
