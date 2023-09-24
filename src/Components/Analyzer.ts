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

  private async init() {
    if (!this.isInitialized) {
      await this._instance.init(new KuromojiAnalyzer({ dictPath: "/dict" }));
      this.isInitialized = true;
    }
    return this._instance;
  }

  public async parse(term: string, to: string, mode: string) {
    const parser = await this.init();
    const result = await parser.convert(term.replace(" ", ""), {
      to: to,
      mode: mode,
      romajiSystem: "nippon",
    });
    return result;
  }

  public async getConvertString(term: string) {
    let convertString = {
      romaji: await this.parse(term, "romaji", "normal"),
      hiragana: await this.parse(term, "hiragana", "normal"),
      furigana: await this.parse(term, "romaji", "furigana"),
    };
    return convertString;
  }
}

export default new Analyzer();
