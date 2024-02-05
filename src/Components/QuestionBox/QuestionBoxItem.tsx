import React from 'react';
import Paragraph from '../ui/Paragraph';

interface QuestionBoxItemProps {
  kana: string;
  text: string;
  kanaHidden: boolean;
}
const QuestionBoxItem = ({ kana, text, kanaHidden }: QuestionBoxItemProps) => (
  <>
    {kanaHidden && <Paragraph style={{ color: '#888', fontSize: '1rem' }}>{kana}</Paragraph>}
    <Paragraph style={{ marginTop: 0, marginBottom: '1rem', paddingLeft: '10px' }}>{text}</Paragraph>
  </>
);

export default QuestionBoxItem;
