import { Avatar, Container, Typography, Box } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Config";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { EmailInput, PasswordInput, SubmitButton } from "../form/presentation";
import Input from "../ui/Input";

export type AuthFormValues = {
  name: string;
  email: string;
  password: string;
};

const Auth = () => {
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

  const registerUser: SubmitHandler<AuthFormValues> = (
    data: AuthFormValues
  ) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log(userCredential);
        // saveUserData(userCredential.user);
        navigate("/home"); // 登録成功後にリダイレク
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
          ユーザー登録
        </Typography>
        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={methods.handleSubmit(registerUser)}
            noValidate
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              width: "90%",
            }}
          >
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
            <EmailInput />
            <PasswordInput />
            <SubmitButton
              possible={"SIGN UP"}
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
      </Box>
    </Container>
  );
};

export default Auth;
