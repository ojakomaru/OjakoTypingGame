import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { RadioItem, SettingTypes } from "../../@types";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { SHORT_TEXT } from "../../@types";
import { TypeModeValues } from "../../Config";




const TypeModeRadio = () => {
  const { control } = useFormContext<SettingTypes>();
  return (
    <FormControl>
      <FormLabel>入力モード</FormLabel>
      <Controller
        name="typeMode"
        defaultValue={SHORT_TEXT}
        control={control}
        render={({ field }) => (
          <RadioGroup name="typeMode">
            {TypeModeValues.map((radio: RadioItem) => (
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

export default TypeModeRadio;
