import React from 'react';
import { styled } from '@mui/material';
import { GameBoard } from '../../presentation';

const StyledCountNumber = styled('div')(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderRadius: '50%',
  width: '100px',
  height: '100px',
  fontSize: '3.6rem',
}));

interface CountdownProps {
  count: number;
}
const Countdown = ({ count }: CountdownProps) => (
  <GameBoard>
    <StyledCountNumber>{count}</StyledCountNumber>
  </GameBoard>
);

export default Countdown;
