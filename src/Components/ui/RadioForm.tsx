import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { FieldWrapperPassThroughProps, FormFieldWrapper } from "./FormFieldWrapper";
import { Options, Option } from "../../@types";

export type RadioProps<T> = {
  fieldWrapper: FieldWrapperPassThroughProps;
  field?: FieldValues;
  name: string;
  options: Options<T>;
};
export const RadioForm = <T extends number | string = number>({
  fieldWrapper,
  field,
  name,
  options,
}: RadioProps<T>): JSX.Element => {
  return (
    <FormFieldWrapper {...fieldWrapper}>
      <RadioGroup name={name}>
        {options.map((radio: Option<T>) => (
          <FormControlLabel
            {...field}
            key={radio.value}
            label={radio.label}
            value={radio.value}
            control={<Radio />}
          />
        ))}
      </RadioGroup>
    </FormFieldWrapper>
  );
};
