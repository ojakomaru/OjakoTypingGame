import React from 'react'
import { alpha, styled } from '@mui/material';

const FormWrapper = styled("div")(({ theme }) => ({
  margin: "0 auto",
  "& form": {
    width: "100%",
    color: alpha(theme.palette.common.black, 0.75),
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
}));

export default FormWrapper