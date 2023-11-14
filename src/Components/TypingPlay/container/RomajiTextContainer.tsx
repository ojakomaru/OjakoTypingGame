import React, {
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  forwardRef,
  useEffect,
} from "react";

type RomajiTextContainerProps = {
  ref: RefObject<HTMLParagraphElement>;
  romaji: string;
  romaPos: number;
  setPosition: Dispatch<SetStateAction<number>>;
  children: ReactNode;
};
const RomajiTextContainerCore = (props: RomajiTextContainerProps) => {
  const { ref, romaji, romaPos, setPosition, children } = props;

  useEffect(() => {
    document.onkeydown = function (e) {
      // 正解時の処理
      if (e.key.toUpperCase() === romaji[romaPos]) {
        // まだ入力していない文字があるとき
        if (romaPos <= romaji.length - 2) {
          // romajiTyped.next(romaPos);
          setPosition(romaPos + 1);
        }
        // すべての文字を入力した時
        else {
          setPosition(0);
          // romajiTyped.reset();
        }
      }
    };
    return () => {
      window.document.onkeydown = null;
    };
  });

  return <React.Fragment>{children}</React.Fragment>;
};

export const RomajiTextContainer = forwardRef<
  HTMLParagraphElement,
  RomajiTextContainerProps
>(RomajiTextContainerCore);
