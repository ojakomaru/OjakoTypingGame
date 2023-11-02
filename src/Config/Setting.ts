import { SHORT_TEXT, LONG_TEXT, REAL_TEXT, Options, UPPER, LOWER, SHIFT_REQUIRED, HIDDEN, SHOW } from "../@types";

const TypeModeValues: Options<string> = [
  { value: SHORT_TEXT, label: "短文" },
  { value: LONG_TEXT, label: "長文" },
  { value: REAL_TEXT, label: "リアル入力" },
];

const RomajiTypeValues: Options<string> = [
  { value: UPPER, label: "大文字" },
  { value: LOWER, label: "小文字" },
  { value: SHIFT_REQUIRED, label: "シフト必須入力" },
];

const ShowRadioFLG: Options<string> = [
  { value: SHOW, label: "表示" },
  { value: HIDDEN, label: "非表示" },
];
export { TypeModeValues, RomajiTypeValues, ShowRadioFLG };
