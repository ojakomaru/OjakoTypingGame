import { TypingDataType } from "../@types";

const initialData: TypingDataType = {
  id: "1",
  title: "test",
  problems: [
    {
      text: "テスト問題",
      kana: "てすともんだい",
      romaji: "tesutomondai",
      typingWords: [
        ["te"],
        ["su"],
        ["to"],
        ["mo"],
        ["n", "xn", "nn"],
        ["da"],
        ["i", "yi"],
      ],
    },
  ],
};
export default initialData;