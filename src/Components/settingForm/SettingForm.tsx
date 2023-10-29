import React from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { SettingTypes, SHORT_TEXT, UPPER } from '../../@types';
import { Stack, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface SettingFormProps {
  setIsSetting?: (a: boolean) => void
}

const defaultSetting = {
      typeMode: SHORT_TEXT, // 短文
      showFurigana: true, // ふりがなを表示
      romajiType: UPPER, // 大文字になる
      showKeyboard: true, // キーボードを表示
    }

function SettingForm(props: SettingFormProps) {
  props.setIsSetting!(true);
  const navigate = useNavigate();
  const methods = useForm<SettingTypes>({
    defaultValues: defaultSetting as SettingTypes,
  });

  const onSubmit: SubmitHandler<SettingTypes> = (data) => {};
  return (
    <FormProvider {...methods}>
      <Stack
        component="form"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Box textAlign="center" mt={2}>
          <Button
            variant="outlined"
            onClick={() => {
              methods.reset(defaultSetting as SettingTypes);
            }}
          >
            リセット
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{ mx: 1 }}
            disabled={!methods.formState.isDirty || !methods.formState.isValid}
          >
            {methods.formState.isValid ? "設定する" : "設定値に問題があります"}
          </Button>
          <Button variant="outlined" onClick={() => navigate("/")}>
            ホームに戻る
          </Button>
        </Box>
      </Stack>
    </FormProvider>
  );
}

export default SettingForm