import React from "react";


export const RomajiTyping = ({ romaji }: { romaji: string | undefined }) => {
  return (
    <React.Fragment>
      <span className="current-letter">{romaji![0]}</span>
      {romaji!
        .split("")
        .slice(1)
        .map((char: string, index: number) => (
          <span className="waiting-letters" key={index}>
            {char}
          </span>
        ))}
    </React.Fragment>
  );
};
