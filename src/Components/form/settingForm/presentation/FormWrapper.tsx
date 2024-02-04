import { styled } from "@mui/material";

interface FormWrapperProps {
  isSetting?: boolean;
}
const FormWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "isSetting",
  name: "FormWrapper",
  slot: "Root",
})<FormWrapperProps>(({ theme, isSetting = false }) => ({
  ...(isSetting
    ? {
        margin: "0 auto",
        "& form": {
          width: "100%",
          // color: alpha(theme.palette.common.black, 0.75),
          display: "flex",
          flexDirection: "column",
          gap: 8,
        },
      }
    : {
        minHeight: "45vh",
        minWidth: "65ch",
        margin: "3rem auto",
      }),
}));

export default FormWrapper;
