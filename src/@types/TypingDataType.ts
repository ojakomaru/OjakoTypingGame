export interface TypingDataType {
  /**
   * タイピングデータを一意に識別するID
   * @type {string}
   * @memberof any
   * @property id
   * @required
   * @example
   * "5e8d8hg8h8h8q8faf8g8f8f"
   */
  id: string;

  /**
   * 問題文のタイトル
   * @type {string}
   * @memberof any
   * @property title
   * @required
   * @example
   * "Ojakoのタイピングゲーム"
   */
  title: string;

  /**
   * 問題文を格納した配列
   * @type {problems[]}
   * @memberof any
   * @property problems
   * @required textのみ必須
   * @example
   * "[{} as problems]"
   * @optional kana romazi furigana
   */
  problems: {
    text: string;
    kana?: string;
    romaji?: string;
    typingWords?: Array<string[]>;
  }[];
}

