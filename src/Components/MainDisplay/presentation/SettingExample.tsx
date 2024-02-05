import React from 'react';
import { Divider } from '@mui/material';
import { LONG_TEXT, type TypingDataType } from '../../../@types';
import { useSettingDataContext } from '../../../Contexts';
import useReloadProblem from '../../TypingPlay/container/hook/useReloadProblem';
import { GameBoard, HiraganaText, QuestionText, RomajiText } from '../../TypingPlay/presentation';
import { useEffectOnce } from '../../../Hooks';

type SettingExampleProps = {
  typingdata: TypingDataType;
};
const SettingExample = ({ typingdata }: SettingExampleProps) => {
  const { typeMode, showFurigana } = useSettingDataContext();
  const { romajiText, kanaText, questionText, reloadProblem } = useReloadProblem(typingdata.problems);

  // 問題文生成
  useEffectOnce(() => {
    reloadProblem();
  });
  return (
    <GameBoard>
      <HiraganaText kanaText={kanaText} $showFurigana={showFurigana} />
      {typeMode === LONG_TEXT ? ( // 長文モード時
        <>
          <RomajiText romaji={romajiText} className="romajiLongMode" />
          <Divider variant="middle" sx={{ borderColor: 'primary.main', width: '100%', height: '3px' }} />
          <QuestionText questionText={questionText} $longMode={typeMode === LONG_TEXT} />
        </>
      ) : (
        <>
          <QuestionText questionText={questionText} />
          <RomajiText romaji={romajiText} />
        </>
      )}
    </GameBoard>
  );
};

export default SettingExample;
