import { romanMap, tree } from "../Config/stringMap";

export default class Romanizer {
  static UPPER_WORD_INITIAL = "word_initial";
  static UPPER_SENTENCE_INITIAL = "sentence_initial";
  static UPPER_ALL = "all";
  static UPPER_NONE = "none";

  sutegana = ["ぁ", "ぃ", "ぅ", "ぇ", "ぉ", "ゃ", "ゅ", "ょ"];

  sokuon = "っ";

  boin = ["a", "i", "u", "e", "o"];

  youon = ["h", "y"];

  upperMode = Romanizer.UPPER_NONE;

  constructor(option) {
    if (option && "upper" in option) {
      this.upperMode = option.upper;
    }
  }

  /**
   * 平仮名からローマ字に変換します
   * @param {string} text 平仮名テキスト
   * @return {string} 変換後のローマ字テキスト
   */
  romanize(_text) {
    const text = this.kanaToHira(_text);
    let romanText = "";
    for (let i = 0; i < text.length; ) {
      const char = this.getChar(text, i);
      romanText += this.getRomanChar(text, i, char);
      i += char.length;
    }
    return this.upper(romanText);
  }

  /**
   * カタカナを平仮名に変換します
   * @param {string} text 入力テキスト
   * @return 変換後の平仮名文字列
   */
  kanaToHira(text) {
    const str = text.trim().replace(/\s+/g, " ");
    return str.replace(/[\u30a1-\u30f6]/g, function (match) {
      const chr = match.charCodeAt(0) - 0x60;
      return String.fromCharCode(chr);
    });
  }

  /**
   * 日本語の文字を取得する
   * 以下の条件に合致する場合は捨て仮名も含めた２文字を取得します。
   * ・次の文字が捨て仮名である（ぁぃぅぇぉゃゅょ）
   * ・捨て仮名を含めた２文字がromanMapに存在する
   * @param {string} text 平仮名テキスト
   * @param {number} i 現在の文字の添字
   * @returns {string}
   */
  getChar(text, i) {
    if (this.isWithSutegana(text, i)) {
      const charWithSutegana = text.substr(i, 2);
      return charWithSutegana in romanMap ? charWithSutegana : text[i];
    } else {
      return text[i];
    }
  }

  /**
   * 日本語の文字に対応するローマ字を取得する
   * 英数記号などもマップにあるため半角へ変換します
   * @param {string} text 平仮名テキスト
   * @param {number} i 現在の文字の添字
   * @param {string} char 一文字（捨て仮名を含む場合は二文字）
   * @return {string} 変換後のローマ字か英数記号
   */
  getRomanChar(text, i, char) {
    let romanChar = char;
    if (char === this.sokuon) {
      return "";
    } else if (char in romanMap) {
      romanChar = romanMap[char][0];
    }
    // 1文字前が促音なら子音を２つにする
    if (text[i - 1] === this.sokuon) {
      romanChar = romanChar[0] + romanChar;
    }
    return romanChar;
  }

  /**
   * タイピング入力で利用するローマ字の配列を返します
   * @param {string} _text 漢字を含まない文字列
   * @returns {Array}
   * 例）「まとりょしか」：[['ma'], ['to'], ['ryo'], ['si', 'shi', 'ci'], ['ka', 'ca']]
   */
  createRomajiWords(_text) {
    const text = this.kanaToHira(_text);
    let remStr = String(text),
      slStr,
      romaAry,
      next;
    let result = [];

    function getFirstStr() {
      // 現在のテキストから先頭一文字を切り抜く
      let oneChar = remStr.slice(0, 1);
      // 現在の先頭文字以降を切り抜き検索対象文字列とする
      remStr = remStr.slice(1);
      return oneChar;
    }

    function isSmallChar() {
      return !!remStr.slice(0, 1).match(/^[ぁぃぅぇぉゃゅょ]$/);
    }

    while (remStr) {
      slStr = getFirstStr();
      next = romanMap[remStr.slice(0, 1)];
      if (slStr === "っ") {
        if (
          !remStr ||
          remStr.match(/^[,.]/) ||
          !next ||
          next[0].match(/^[aiueon]/)
        ) {
          romaAry = [...romanMap[slStr]];
          result.push(romaAry);
        } else {
          slStr = getFirstStr();
          if (isSmallChar()) slStr += getFirstStr();
          // 次の先頭文字を複製して追加
          romaAry = [...romanMap[slStr].map((str) => str.slice(0, 1) + str)];
          result.push(romaAry);
        }
      } else {
        // 次の文字に小さい文字（捨て仮名）が含まれている場合はひとまとめにする
        if (isSmallChar()) slStr += getFirstStr();
        if (slStr === "&") {
          slStr += remStr.slice(0, 7);
          remStr = remStr.slice(7);
        }
        // 現在の文字がマップに含まれていれば追加
        romaAry = romanMap[slStr] ? [...romanMap[slStr]] : [...slStr];
        if (slStr === "ん") {
          if (!remStr) {
            // 後続の文字列がなければ"n"を削除
            romaAry.pop();
          } else {
            // 後続の文字列が「あ行な行や行」なら"n"を削除
            if (next[0].match(/^[aiueony]/)) romaAry.pop();
          }
        }
        result.push(romaAry);
      }
    }
    return result;
  }

  /**
   * 入力した文字から平仮名を何文字入力できたか判定しその移動量を返します
   * @param {string} kana 現在入力中の平仮名
   * @param {string} roma 問題文のローマ字テキスト
   * @param {number} r 現在入力中のローマ字の位置
   * @returns {number} それぞれのパターンで以下の戻り値になる
   *                   2: 拗音を含む文字を入力完了
   *                   1: 通常のローマ字を入力完了またはアルファベットor記号の時
   *                   0: 現在の文字が入力途中またはローマ字として成立していない
   */
  isKanaMove(kana, roma, r) {
    let result = "";
    let tmp = "";
    let isKanaPos = 1;

    if (kana.match(/^[ぁ-ん]+$/) || kana.match(/^[ァ-ヶ]+$/)) {
      // 現在の文字が母音であるか
      if (this.boin.includes(roma[r].toLowerCase())) {
        // 一つ前の文字が拗音かどうか
        if (this.youon.includes(roma.substr(r - 1, 1).toLowerCase())) {
          tmp = roma.substr(r - 2, 3);
          isKanaPos = 2;
        }
        // 一文字前が母音かどうか
        else if (this.boin.includes(roma.substr(r - 1, 1).toLowerCase())) {
          tmp = roma.substr(r, 1);
          isKanaPos = 1;
        } else {
          tmp = roma.substr(r - 1, 2);
          isKanaPos = 1;
        }
        result = this.romaToHira(tmp.toLowerCase());
        isKanaPos = result in romanMap ? isKanaPos : 0;
      } else {
        isKanaPos = 0;
        // 現在の文字が「ん」の場合はOK
        if (
          roma[r] === "N" &&
          !this.boin.includes(roma.substr(r + 1, 1).toLowerCase())
        )
          isKanaPos = 1;
      }
    } else {
      return isKanaPos;
    }
    return isKanaPos;
  }

  /**
   * ローマ字から平仮名へ変換する
   * 何文字でも可能
   * @param {string} roma ローマ字の文字列
   * @returns {string} 平仮名に変換後の文字列
   */
  romaToHira(roma) {
    let result = "";
    let tmp = "";
    let index = 0;
    let node = tree;
    const len = roma.length;

    const push = (char, toRoot = true) => {
      result += char;
      tmp = "";
      node = toRoot ? tree : node;
    };

    while (index < len) {
      const char = roma.charAt(index);
      if (char.match(/[a-z-]/)) {
        if (char in node) {
          const next = node[char];
          if (typeof next === "string") {
            push(next);
          } else {
            tmp += roma.charAt(index);
            node = next;
          }
          index++;
          continue;
        }
        const prev = roma.charAt(index - 1);
        if (prev && (prev === "n" || prev === char)) {
          push(prev === "n" ? "ん" : "っ", false);
        }
        if (node !== tree && char in tree) {
          push(tmp);
          continue;
        }
      }
      push(tmp + char);
      index++;
    }
    tmp = tmp.replace(/n$/, "ん");
    push(tmp);
    return result;
  }

  /**
   * 次の文字が捨て仮名の場合、真を返します
   *
   * @param text
   * @param i
   * @returns {boolean}
   */
  isWithSutegana(text, i) {
    const nextIdx = i + 1;
    if (nextIdx >= text.length) {
      return false;
    }

    const char = text[nextIdx];
    return this.sutegana.includes(char);
  }

  upper(romanText) {
    switch (this.upperMode) {
      case Romanizer.UPPER_WORD_INITIAL:
        return this.upperWordInitial(romanText);
      case Romanizer.UPPER_SENTENCE_INITIAL:
        return this.upperSentenceInitial(romanText);
      case Romanizer.UPPER_ALL:
        return this.upperAll(romanText);
      case Romanizer.UPPER_NONE:
        return romanText;
      default:
        throw new Error("upperに不正な値が指定されています");
    }
  }

  upperWordInitial(romanText) {
    let result = romanText[0].toUpperCase();
    for (let i = 1; i < romanText.length; i++) {
      const char = romanText[i];
      const prevChar = romanText.substr(i - 1, 1);
      if (prevChar.match(/\s/)) {
        result += char.toUpperCase();
      } else {
        result += char;
      }
    }
    return result;
  }
  upperWordInitialAry(typingWord) {
    let char = typingWord[0][0][0].toUpperCase();
    for (let i = 1; i < typingWord[0][0].length; i++) {
      char += typingWord[0][0][i];
    }
    typingWord[0][0] = char;
    for (let i = 1; i < typingWord.length; i++) {
      for (let j = 0; j < typingWord[i].length; j++) {
        char = '';
        if (typingWord[i - 1][j] === " ") {
          char = typingWord[i][j][0].toUpperCase();
          for (let k = 1; k < typingWord[i][j].length; k++) {
            char += typingWord[i][j][k];
          }
          typingWord[i][j] = char;
        } else {
          for (let k = 0; k < typingWord[i][j].length; k++) {
            char += typingWord[i][j][k].toLowerCase();
          }
          typingWord[i][j] = char;
        }
      }
    }
    return typingWord;
  }

  upperSentenceInitial(romanText) {
    let result = "";
    let inSentence = false;
    for (let i = 0; i < romanText.length; i++) {
      const char = romanText[i];

      if (char.match(/[a-zA-Zāâīîūûēêōô]/) && inSentence === false) {
        result += char.toUpperCase();
        inSentence = true;
      } else {
        if (char === ".") {
          inSentence = false;
        }
        result += char;
      }
    }
    return result;
  }

  upperAll(romanText) {
    let result = "";
    for (let i = 0; i < romanText.length; i++) {
      const char = romanText[i];
      result += char.toUpperCase();
    }
    return result;
  }
  upperAllAry(typingWord) {
    for (let i = 0; i < typingWord.length; i++) {
      for (let j = 0; j < typingWord[i].length; j++) {
        let text = typingWord[i][j];
        typingWord[i][j] = this.upperAll(text);
      }
    }
    return typingWord;
  }

  lowerAll(romanText) {
    let result = "";
    for (let i = 0; i < romanText.length; i++) {
      const char = romanText[i];
      result += char.toLowerCase();
    }
    return result;
  }
  lowerAllAry(typingWord) {
    for (let i = 0; i < typingWord.length; i++) {
      for (let j = 0; j < typingWord[i].length; j++) {
        let text = typingWord[i][j];
        typingWord[i][j] = this.lowerAll(text);
      }
    }
    return typingWord;
  }

  /**
   * 以下のいずれかに該当する場合は真を返す
   * ・撥音「ん」の後に母音やヤ行音が来てナ行音と区別できない場合
   * ・文の末尾に促音がある場合
   * @param text
   * @param i
   * @returns {boolean}
   */
  isNeedApostrophe(text, i) {
    if (
      text[i] === "ん" &&
      ["あ", "い", "う", "え", "お", "や", "ゆ", "よ"].includes(text[i + 1])
    ) {
      return true;
    }
    if (text[i] === this.sokuon && i + 1 >= text.length) {
      return true;
    }
    return false;
  }
}
