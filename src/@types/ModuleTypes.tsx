export interface HomeProps {
  problemNo: number;
  setProblemNo: (a: number) => void;
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
  problemNo: number;
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
  problemNo: number;
  text: {
    description: string;
    image: string;
    linkText: string;
    title: string;
  };
  isHome?: boolean;
  setIsHome?: (a: boolean) => void;
  startText?: string;
  isPlaying?: boolean;
  setIsPlaying?: (a: boolean) => void;
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
