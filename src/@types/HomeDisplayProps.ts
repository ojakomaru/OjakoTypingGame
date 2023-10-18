export interface HomeDisplayProps {
  /**
   * ディスプレイに表示するタイトル
   * @type {string}
   * @memberof HomeDisplay
   * @required
   * @example
   * "本日のタイピング", ""
   */
  title: string | undefined;
  /**
   * 簡約化された概要分
   * @type {string}
   * @memberof HomeDisplay
   * @required
   * @example
   * "今日はいい天気ですね...", ""
   */
  description: string;
  /**
   * 画面の背景に表示するイメージ
   * @type {string}
   * @memberof HomeDisplay
   * @required
   * @example
   * "https://www.exampleImage.com"
   */
  image: string;
  linkText: string;
}
