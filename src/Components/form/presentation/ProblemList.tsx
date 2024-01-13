import React from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { type TypingDataType } from "../../../@types";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import {
  Add as AddIcon,
  DeleteOutline as DeleteOutlineIcon,
} from "@mui/icons-material";

const ProblemList = (): JSX.Element => {
  const { control, register } = useFormContext<TypingDataType>();
  const { fields, append, remove } = useFieldArray({
    name: "problems",
    control,
  });
  return (
    <>
      {fields.map((item, index) => (
        <Stack mt={2} key={item.id}>
          <Controller
            render={({ field }) => (
              <TextField
              {...field}
                sx={{ mr: 2, flex: 3 }}
                variant="standard"
                size="small"
                label="問題文"
                autoFocus
                multiline
                {...register(`problems[${index}].text` as "problems", {
                  required: "空の問題文は登録できません。",
                })}
              />
            )}
            // @ts-ignore
            defaultValue={item.envName}
            name={`problems[${index}].text` as "problems"}
            control={control}
          />

          <IconButton
            color="warning"
            aria-label="delete"
            onClick={() => remove(index)}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </Stack>
      ))}
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="baseline"
      >
        <Button
          sx={{ mt: 1 }}
          startIcon={<AddIcon />}
          onClick={() => append({ text: "" })}
        >
          問題文を追加
        </Button>
        <IconButton
          color="warning"
          aria-label="delete"
          onClick={() => remove()}
          sx={{ fontSize: "0.8rem" }}
        >
          <DeleteOutlineIcon />
          すべての問題を削除
        </IconButton>
      </Stack>
    </>
  );
};
export default ProblemList;
