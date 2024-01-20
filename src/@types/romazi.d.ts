declare module "react-helmet";
declare module "hamburger-react";
declare module "js-hira-kata-romanize";
declare module 'kuroshiro';
declare module "kuroshiro-analyzer-kuromoji";
declare module 'react-typical';
declare module "path-browserify" {
  import path from "path";
  export default path;
}
declare class Kuroshiro {
  constructor();
  init(_analyzer: any): Promise<void>;
  convert(
    str: string,
    options?: {
      to?: string;
      mode?: string;
      romajiSystem?: string;
      delimiter_start?: string;
      delimiter_end?: string;
    }
  ): Promise<string>;
  Util: {
    isHiragana: (ch: string) => boolean;
    isKatakana: (ch: string) => boolean;
    isKana: (ch: string) => boolean;
    isKanji: (ch: string) => boolean;
    isJapanese: (ch: string) => boolean;
    hasHiragana: (str: string) => boolean;
    hasKatakana: (str: string) => boolean;
    hasKana: (str: string) => boolean;
    hasKanji: (str: string) => boolean;
    hasJapanese: (str: string) => boolean;
    kanaToHiragana: (str: string) => string;
    kanaToKatakana: (str: string) => string;
    kanaToRomaji: (
      str: string,
      system: "nippon" | "passport" | "hepburn"
    ) => string;
  };
}

declare module "kuroshiro" {
  export = Kuroshiro;
}