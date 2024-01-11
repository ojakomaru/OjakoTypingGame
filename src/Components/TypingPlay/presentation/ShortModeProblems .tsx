import React from "react";
import { ModeProblemsProps } from "../../../@types";
import { HiraganaText } from "./HiraganaText";
import { QuestionText } from "./QuestionText";
import { RomajiText } from "./RomajiText";

const ShortModeProblems = (props: ModeProblemsProps) => {
  const { refs, isRealMode, kanaText, showFurigana, romajiText, questionText } =
    props;
  return (
    <React.Fragment>
      <HiraganaText
        ref={refs[0]}
        kanaText={kanaText}
        $showFurigana={showFurigana}
      />
      <QuestionText questionText={questionText} />
      <RomajiText ref={refs[1]} romaji={romajiText} $isRealMode={isRealMode} />
    </React.Fragment>
  );
};

export default ShortModeProblems;
