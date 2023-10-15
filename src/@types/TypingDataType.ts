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
   * @type {Array<string>}
   * @memberof any
   * @property problems
   * @required textのみ必須
   * @example
   * "git switch -c {ブランチ名} 対象ブランチを新規作成し、切り替える"
   * @optional kana romazi furigana
   * @example kana
   * "git switch -c {ブランチめい} たいしょうブランチをしんきさくせいし、きりかえる"
   * @example romazi
   * "GIT SWITCH -C {BURANTIMEI} TAISYOUBURANTIWOSINKISAKUSEISI,KIRIKAERU"
   * @example furigana
   *"<ruby>..."
   */
  problems: {
    text: string;
    kana?: string;
    romazi?: string;
    furigana?: string;
  }[];
}
