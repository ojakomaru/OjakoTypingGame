import { FormControl, Box, Typography } from '@mui/material';
import React, { PropsWithChildren, ReactNode } from 'react'

type FieldWrapperProps = {
  label: string;
  required?: boolean;
  errorMessage?: string;
  children: ReactNode
};

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, "children">;

export const FormFieldWrapper = (props: FieldWrapperProps) => {
  const {label, required, errorMessage, children} = props;
  return (
    <FormControl fullWidth error={!!errorMessage}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <Typography sx={{ fontSize: 20 }}>{label}</Typography>
          {required && (
            <Typography color="error" fontSize={12}>
              ※必須
            </Typography>
          )}
        </Box>
        {children}
        {errorMessage && (
          <Typography color="error" fontSize={12}>
            {errorMessage}
          </Typography>
        )}
      </Box>
    </FormControl>
  );
}
