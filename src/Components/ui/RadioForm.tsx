import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";

import { Options, Option, SettingTypes, ROMAJI_TYPE, TYPE_MODE } from "../../@types";
import { useFormContext, Controller } from "react-hook-form";

export type RadioProps<T> = {
  name: string;
  label?: string;
  options: Options<T>;
};
export const RadioForm = (props: RadioProps<string>) => {
  const { name, label, options } = props;
  //  const { control } = useFormContext<SettingTypes>();
  //  return (
  //    <FormControl>
  //      <FormLabel>{label}</FormLabel>
  //      <Controller
  //        name="radio"
  //        control={control}
  //        render={({ field }) => (
  //          <RadioGroup name={name}>
  //            {options.map((radio: Option<string>) => (
  //              <FormControlLabel
  //                {...field}
  //                key={radio.value}
  //                label={radio.label}
  //                value={radio.value}
  //                control={<Radio />}
  //              />
  //            ))}
  //          </RadioGroup>
  //        )}
  //      />
  //    </FormControl>
  //  );
};
