import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";


/**
 * class Analyzer
 * 文字列変換ライブラリのKuroshiroのラッパークラス
 */
class Analyzer {
  private _instance: Kuroshiro;

  private isInitialized: boolean;

  constructor() {
    this._instance = new Kuroshiro();
    this.isInitialized = false;
  }

  /**
   * Analyzerの形態解析をセットして初期化します
   * @returns 初期化したAnalyzerインスタンス
   */
  private async init() {
    if (!this.isInitialized) {
      await this._instance.init(new KuromojiAnalyzer({ dictPath: "/dict" }));
      this.isInitialized = true;
    }
    return this._instance;
  }

  public async parse(term: string, to: string, mode: string) {
    const parser = await this.init();
    const result = await parser.convert(term, {
      to,
      mode,
      romajiSystem: "nippon",
    });
    return result;
  }

  /**
   * 文字列を受け取ってローマ字、ひらがな、ルビ振り済みマークアップを返します。
   * @param term 変換する文字列
   * @returns Object 変換結果を格納したオブジェクト
   */
  public async getConvertString(term: string) {
    const convertString = {
      romaji: await this.parse(term, "romaji", "normal"),
      hiragana: await this.parse(term, "hiragana", "normal"),
      furigana: await this.parse(term, "romaji", "furigana"),
    };
    return convertString;
  }
}

export default new Analyzer();
