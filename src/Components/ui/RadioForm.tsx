import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { RadioGroupProps } from "@mui/material";
import { Options, Option, SettingTypes } from "../../@types";

type RomajiTypeRadioProps = {
  radioGroupProps: RadioGroupProps;
  options: Options<string>;
  label?: string;
};

export const RadioForm = ({ radioGroupProps, options, label }: RomajiTypeRadioProps) => {
  const { control } = useFormContext<SettingTypes>();
  return (
    <FormControl>
      {label ?? <FormLabel>{label}</FormLabel>}
      <Controller
        name={radioGroupProps.name as any}
        control={control}
        render={({ field }) => (
          <RadioGroup {...radioGroupProps}>
            {options.map((radio: Option<string>) => (
              <FormControlLabel
                {...field}
                key={radio.value}
                label={radio.label}
                value={radio.value}
                control={<Radio />}
              />
            ))}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};
