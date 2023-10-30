import { SHORT_TEXT, LONG_TEXT, REAL_TEXT, RadioItem } from "../@types";

const TypeModeValues: Array<RadioItem> = [
  { value: SHORT_TEXT, label: "短文" },
  { value: LONG_TEXT, label: "長文" },
  { value: REAL_TEXT, label: "リアル入力" },
];
export{TypeModeValues};