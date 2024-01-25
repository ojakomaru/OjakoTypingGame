import { Avatar, Button, Container, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box } from "@mui/system";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Config";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";

export type FormValues = {
  email: string;
  password: string;
};

const Auth = () => {
  const navigate = useNavigate();

  const defaultValue = {
    email: "",
    password: "",
  };
  const methods = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: defaultValue,
  });

  const registerUser: SubmitHandler<FormValues> = (data: FormValues) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/home"); // 登録成功後のリダイレクトページを設定してください。
      })
      .catch((error) => {
        alert(error.message);
        console.error(error);
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <FormProvider {...methods}>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            {/* Input for email */}

            {/* Input for password */}

            {/* Submit button */}
            <Button
              onClick={methods.handleSubmit(registerUser)}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              SIGN IN
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default Auth;
