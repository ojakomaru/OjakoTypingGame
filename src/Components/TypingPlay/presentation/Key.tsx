import { Box } from '@mui/material'
import React, { ReactNode } from 'react'

type KeyProps = {
  shift: boolean,
  children: ReactNode;
}
const Key = ({shift, children}: KeyProps) => {
  return (
    <Box component={"div"} >{children}</Box>
  )
}

export default Key