import React from "react";
import { Option, SettingTypes, UPPER } from "../../../@types";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { RomajiTypeValues } from "../../../Config";

const RomajiTypeRadio = () => {
  const { control } = useFormContext<SettingTypes>();
  return (
    <FormControl>
      <FormLabel>ローマ字設定</FormLabel>
      <Controller
        name="romajiType"
        control={control}
        defaultValue={UPPER}
        render={({ field }) => (
          <RadioGroup name="romajiType">
            {RomajiTypeValues.map((radio: Option<string>) => (
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

export default RomajiTypeRadio;
