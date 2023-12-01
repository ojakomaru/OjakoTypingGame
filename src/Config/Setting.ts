import { SHORT_TEXT, LONG_TEXT, REAL_TEXT, Options, UPPER, LOWER, NONE, HIDDEN, SHOW, RANDOM, REGI_ORDER, WORD_INITIAL } from "../@types";

const TypeModeValues: Options<string> = [
  { value: SHORT_TEXT, label: "短文" },
  { value: LONG_TEXT, label: "長文" },
  { value: REAL_TEXT, label: "リアル入力" },
];

const RomajiTypeValues: Options<string> = [
  { value: UPPER, label: "大文字" },
  { value: LOWER, label: "小文字" },
  { value: WORD_INITIAL, label: "先頭単語大文字" },
  { value: NONE, label: "オリジナル" },
];

const OrderValues: Options<string> = [
  { value: REGI_ORDER, label: "登録順" },
  { value: RANDOM, label: "ランダム" },
];

const ShowRadioFLG: Options<string> = [
  { value: SHOW, label: "表示" },
  { value: HIDDEN, label: "非表示" },
];

const defaultSetting = {
  typeMode: SHORT_TEXT, // 短文
  showFurigana: SHOW,   // ふりがなを表示
  romajiType: UPPER,    // 大文字になる
  order: REGI_ORDER,    // 登録順
  showKeyboard: SHOW,   // キーボードを表示
};

export {
  TypeModeValues,
  RomajiTypeValues,
  ShowRadioFLG,
  OrderValues,
  defaultSetting,
};
