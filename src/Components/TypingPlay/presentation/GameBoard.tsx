import React, { ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import styled from "styled-components";
import MissMessage from "../container/MissMessage";
import GameTimer from "./GameTimer";

const StyleGameBoard = styled(Box)`
  position: relative;
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

interface GameBoardProps {
  miss?: boolean;
  missCount?: number;
  children: ReactNode;
}
export default function GameBoard({ miss, missCount, children }: GameBoardProps) {
  return (
    <StyleGameBoard>
      <MissMessage $isMiss={!!miss} />

      {children}
    </StyleGameBoard>
  );
}
