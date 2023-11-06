import React, { useState } from "react";
import {
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { RadioGroupProps } from "@mui/material";
import { Options, Option, SettingTypes } from "../../../../@types";
import StyledRadioForm from "./StyledRadioForm";

type RadioProps = {
  radioGroupProps: RadioGroupProps;
  options: Options<string>;
  label?: string;
};

export const RadioForm = ({ radioGroupProps, options, label }: RadioProps) => {
  const { control } = useFormContext<SettingTypes>();
  const [checked, setSelectedValue] = useState(radioGroupProps.defaultValue);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <StyledRadioForm>
      {label ?? <FormLabel>{label}</FormLabel>}
      <Controller
        name={radioGroupProps.name as any}
        control={control}
        render={({ field }) => (
          <RadioGroup {...radioGroupProps} onChange={handleChange}>
            {options.map((radio: Option<string>) => (
              <FormControlLabel
                {...field}
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
        )}
      />
    </StyledRadioForm>
  );
};
