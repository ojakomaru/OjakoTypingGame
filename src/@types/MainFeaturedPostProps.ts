

export interface MainFeaturedPostProps {
  /**
   * ホーム画面を表示中のフラグ
   * @type {boolean}
   * @memberof MainFeaturedPost
   * @property isHome
   * @optional
   * @default
   * false
   */
  isHome?: boolean;
  setIsHome?: (a: boolean) => void;
  startText?: string;
  isPlaying?: boolean;
  setIsPlaying?: (a: boolean) => void;
}


