import React from "react";
import {
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { RadioGroupProps } from "@mui/material";
import { Options, Option, SettingTypes } from "../../../../@types";
import { CustomFormControlLabel, CustomFormControl } from "../presentation";

type RadioProps = {
  radioGroupProps: RadioGroupProps;
  options: Options<string>;
  label?: string;
  setFunc: any;
};

export const RadioForm = (props: RadioProps) => {
  const { radioGroupProps, options, label, setFunc } = props;
  const { control } = useFormContext<SettingTypes>();

  return (
    <CustomFormControl>
      {label ?? <FormLabel>{label}</FormLabel>}
      <Controller
        name={radioGroupProps.name as any}
        control={control}
        render={({ field }) => (
          <RadioGroup
            {...radioGroupProps}
            value={field.value}
            onChange={(e) => setFunc(e.target.value)}
          >
            {options.map((radio: Option<string>, i) => (
              <CustomFormControlLabel
                {...field}
                key={`radio.value${i}`}
                label={radio.label}
                value={radio.value}
                control={<Radio />}
              />
            ))}
          </RadioGroup>
        )}
      />
    </CustomFormControl>
  );
};
