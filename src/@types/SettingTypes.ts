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
const SHIFT_REQUIRED = "shift";
type ROMAJI_TYPE = typeof UPPER | typeof LOWER | typeof SHIFT_REQUIRED;

export interface SettingTypes {
  typeMode: TYPE_MODE;
  showFurigana: SHOW_RADIO;
  romajiType: ROMAJI_TYPE; // TextField select用
  showKeyboard: SHOW_RADIO; // Check用
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
  SHIFT_REQUIRED,
  type ROMAJI_TYPE
};
