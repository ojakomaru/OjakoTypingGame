import React, { ReactNode } from "react";
import { Box } from "@mui/material";
import styled from "styled-components";

const StyleGameBoard = styled(Box)`
  text-align: center;
  min-height: 35vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem auto;
  padding: 1rem 2rem;
  color: #2d0303;
  width: 80%;
  background-color: rgba(255, 255, 255, 0.95);
  font-size: calc(14px + 2vmin);
  border: 2px solid #000;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
`;
export default function GameBoard({ children }: { children: ReactNode }) {
  return <StyleGameBoard>{children}</StyleGameBoard>;
}
