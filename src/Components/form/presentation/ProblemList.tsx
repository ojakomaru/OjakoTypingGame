import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
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
        <Stack my={3} key={item.id}>
          <TextField
            sx={{ mr: 2, flex: 3 }}
            variant="standard"
            size="small"
            label="問題文"
            {...register(`problems[${index}].text` as "problems", {
              required: true,
            })}
          />
          {/* remove 関数は特定の位置の input を削除、位置を指定しない場合は全てを削除 */}
          <IconButton
            color="warning"
            aria-label="delete"
            onClick={() => remove(index)}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </Stack>
      ))}
      <Button
        sx={{ mt: 1 }}
        startIcon={<AddIcon />}
        // append 関数はフィールドの最後に input を追加する
        onClick={() => append({ text: "" })}
      >
        行を追加する
      </Button>
    </>
  );
};
export default ProblemList;
