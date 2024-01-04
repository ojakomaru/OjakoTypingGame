import React from "react";
import { Divider } from "@mui/material";
import { ModeProblemsProps } from "../../../@types";
import { HiraganaText } from "./HiraganaText";
import { QuestionText } from "./QuestionText";
import { RomajiText } from "./RomajiText";

const LongModeProblems = (props: ModeProblemsProps) => {
  const { refs, kanaText, showFurigana, romajiText, questionText } = props;
  return (
    <React.Fragment>
      <HiraganaText
        ref={refs[0]}
        kanaText={kanaText}
        $showFurigana={showFurigana}
        className="hiraganaLongMode"
      />
      <RomajiText
        ref={refs[1]}
        romaji={romajiText}
        className="romajiLongMode"
      />
      <Divider
        variant="middle"
        sx={{
          borderColor: "primary.main",
          width: "100%",
          height: "3px",
        }}
      />
      <QuestionText questionText={questionText} $longMode={true} />
    </React.Fragment>
  );
};

export default LongModeProblems;
