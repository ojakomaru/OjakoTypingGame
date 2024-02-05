import React, { useState } from 'react';
import styled from 'styled-components';
import StarsIcon from '@mui/icons-material/Stars';
import { Button, styled as MuiStyled } from '@mui/material';
import { ProblemType } from '../../@types';
import QuestionBoxItem from './QuestionBoxItem';

const StyledQuestionBoxWrapper = styled.div`
  border: 1px solid #dde4e6;
  background-color: #fafafa;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  line-height: 150%;
`;
const StyledQuestionBoxTitle = MuiStyled('h2')(({ theme }) => ({
  color: theme.palette.primary.main,
  position: 'relative',
  fontWeight: 'bold',
  marginBottom: '5px',
  fontSize: '1.8rem',
}));
const KanaShowToggle = MuiStyled(Button)({
  position: 'absolute',
  right: '40px',
  top: 0,
});
const StyledQuestionBoxContent = styled.div`
  font-size: 1.6rem;
  margin: 10px 5px 20px 20px;
  line-height: 120%;
  color: #000;
  word-break: break-all;
  word-wrap: anywhere;
  text-align: left;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0px;
`;

interface QuestionBoxProps {
  problems: ProblemType;
}
const QuestionBox = ({ problems }: QuestionBoxProps) => {
  const [kanaHidden, setKanaHidden] = useState(true);
  return (
    <StyledQuestionBoxWrapper>
      <StyledQuestionBoxTitle>
        <StarsIcon />
        {'問題文'}
        <KanaShowToggle variant="outlined" onClick={() => setKanaHidden(!kanaHidden)}>
          {'ふりがな非表示'}
        </KanaShowToggle>
      </StyledQuestionBoxTitle>
      <StyledQuestionBoxContent>
        {problems.map((problem, index) => (
          <QuestionBoxItem key={index} kana={`（${problem.kana}）`} text={problem.text} kanaHidden={kanaHidden} />
        ))}
      </StyledQuestionBoxContent>
    </StyledQuestionBoxWrapper>
  );
};

export default QuestionBox;
