export interface HomeProps {
  problemNo: string;
  setProblemNo: (a: string) => void;
  setting: {
    isROMAZI: boolean;
    isKANA: boolean;
    isKeyGuide: boolean;
    isShowWPM: boolean;
    isSpeedBer: boolean;
  };
  score: number;
  setScore: (a: number) => void;
}

export interface PlayingProps {
  problemNo: string;
  setting: {
    isROMAZI: boolean;
    isKANA: boolean;
    isKeyGuide: boolean;
    isShowWPM: boolean;
    isSpeedBer: boolean;
  };
  score: number;
  setScore: (a: number) => void;
}

export interface MainFeaturedPostProps {
  problemNo: string;
  text: HomeDisplayProps;
  isHome?: boolean;
  setIsHome?: (a: boolean) => void;
  startText?: string;
  isPlaying?: boolean;
  setIsPlaying?: (a: boolean) => void;
}

export interface HomeDisplayProps {
  title: string | undefined;
  description: string | undefined;
  image: string;
  linkText: string;
}

export interface InputType {
  id: string;
  title: string;
  problems: {
    text: string;
    kana?: string;
    romazi?: string;
    furigana?: string;
  }[];
}
