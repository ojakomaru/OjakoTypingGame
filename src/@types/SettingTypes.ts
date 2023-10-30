// TYPE_MODE
const SHORT_TEXT = "short";
const LONG_TEXT = "long";
const REAL_TEXT = "raal";
type TYPE_MODE = typeof SHORT_TEXT | typeof LONG_TEXT | typeof REAL_TEXT;
type RadioItem = {
  value: TYPE_MODE;
  label: string;
};

// ROMAJI_TYPE
const UPPER = "upper";
const LOWER = "lower";
const SHIFT_REQUIRED = "shift";
type ROMAJI_TYPE = typeof UPPER | typeof LOWER | typeof SHIFT_REQUIRED;

export interface SettingTypes {
  typeMode: TYPE_MODE;
  showFurigana: boolean;
  romajiType: ROMAJI_TYPE; // TextField select用
  showKeyboard: boolean; // Check用
}

export {
  SHORT_TEXT,
  LONG_TEXT,
  REAL_TEXT,
  type TYPE_MODE,
  type RadioItem,
  UPPER,
  LOWER,
  SHIFT_REQUIRED,
  type ROMAJI_TYPE
};
