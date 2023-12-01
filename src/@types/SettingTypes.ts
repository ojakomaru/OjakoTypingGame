type Option<T> = { label: string; value: T };
type Options<T> = Option<T>[];
// TYPE_MODE
const SHORT_TEXT = "short";
const LONG_TEXT = "long";
const REAL_TEXT = "raal";
type TYPE_MODE = typeof SHORT_TEXT | typeof LONG_TEXT | typeof REAL_TEXT;

// SHOW_RADIO
const SHOW = "show";
const HIDDEN = "hidden";
type SHOW_RADIO = typeof SHOW | typeof HIDDEN;

// ROMAJI_TYPE
const UPPER = "upper";
const LOWER = "lower";
const WORD_INITIAL = "wordInitial";
const SENTENCE_INITIAL = "sentenceInitial";
const NONE = "shift";
type ROMAJI_TYPE =
  | typeof UPPER
  | typeof LOWER
  | typeof WORD_INITIAL
  | typeof NONE;

// ORDER_TYPE
const REGI_ORDER = "registration-order";
const RANDOM = "random";
type ORDER_TYPE = typeof REGI_ORDER | typeof RANDOM;

export interface SettingTypes {
  typeMode: TYPE_MODE; // 問題の種類
  showFurigana: SHOW_RADIO; // ふりがな表示
  romajiType: ROMAJI_TYPE; // 大文字小文字もしくはShift操作するか
  order: ORDER_TYPE; // 出題順
  showKeyboard: SHOW_RADIO; // キーボードを表示
}

export {
  type Option,
  type Options,
  SHORT_TEXT,
  LONG_TEXT,
  REAL_TEXT,
  type TYPE_MODE,
  SHOW,
  HIDDEN,
  type SHOW_RADIO,
  UPPER,
  LOWER,
  WORD_INITIAL,
  NONE,
  type ROMAJI_TYPE,
  REGI_ORDER,
  RANDOM,
  type ORDER_TYPE,
};
