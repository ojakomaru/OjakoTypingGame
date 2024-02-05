import { Avatar, Container, Typography, Box, Link } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { EmailInput, PasswordInput, SubmitButton } from "../form/presentation";
import Input from "../ui/Input";
import { auth } from "../../Config";
import saveUserData from "../../Util/saveUserData";
import { useAuthContext } from "../../Contexts";

import SocialLogin from "./SocialLogin";
import { AuthFormValues } from "../../@types";

const Auth = () => {
  const { user, isAuthLoading } = useAuthContext();
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const defaultValue = {
    name: "",
    email: "",
    password: "",
  };

  const methods = useForm<AuthFormValues>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: defaultValue,
  });

  const authenticationAction: SubmitHandler<AuthFormValues> = async (
    data: AuthFormValues
  ) => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, data.email, data.password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        await sendEmailVerification(userCredential.user);
        updateProfile(auth.currentUser as User, {
          displayName: data.name,
        });
        saveUserData(data, userCredential.user);
      }
    } catch (error) {
      console.log(error);
    }
    methods.reset(defaultValue);
  };

  useEffect(() => {
    if (!!user && !isAuthLoading) navigate("/home"); // 登録成功後にリダイレクト
  }, [user, isLogin]);

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
          {isLogin ? "ログイン" : "ユーザー登録"}
        </Typography>
        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={methods.handleSubmit(authenticationAction)}
            noValidate
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              width: "90%",
            }}
          >
            {!isLogin && (
              <Input
                name="name"
                control={methods.control}
                rules={{
                  required: "名前を入力してください。",
                }}
                textFieldProps={{
                  label: "ニックネーム",
                  autoFocus: true,
                }}
              />
            )}
            <EmailInput />
            <PasswordInput />
            <SubmitButton
              possible={isLogin ? "SIGN IN" : "SIGN UP"}
              unable={"項目の入力をお願いします"}
              status={{
                isDirty: methods.formState.isDirty,
                isValid: methods.formState.isValid,
              }}
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            />
          </Box>
        </FormProvider>
        <Typography
          sx={{ mt: 0, fontSize: (theme) => theme.typography.fontSize - 1 }}
        >
          {`アカウントをお持ちで${isLogin ? "ない" : ""}ですか？`}
          <Link
            underline="none"
            sx={{ cursor: "pointer" }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {!isLogin ? "ログイン" : "新規登録"}はコチラ
          </Link>
        </Typography>
        <SocialLogin />
      </Box>
    </Container>
  );
};

export default Auth;
