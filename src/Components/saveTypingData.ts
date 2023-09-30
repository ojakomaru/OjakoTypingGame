import { type TypingDataType } from "../@types/ModuleTypes";
import Analyzer from "./Analyzer";

const saveTypingData = (typingdata: TypingDataType): void => {
  let word: string = "";
  typingdata.problems.map(async (problem) => {
    //APIで変換したいテキスト
    word = problem.text;
    let convertString = await Analyzer.getConvertString(word);
    problem.romazi = convertString.romaji; // ローマ字変換
    problem.kana = convertString.hiragana; // かな変換
    problem.furigana = convertString.furigana; //ふりがなマークアップ
    // 半角文字列1234567890!@#$%^&*();:'"\|.<>[]?.,_=+~
    // 全角文字列１２３４５６７８９０！＠＃＄％＾＆＊（）：；’”￥｜？・＜＞「」＿＝＋〜
  });
  console.log(typingdata);

  // 登録されたデータが有れば取得
  // if (localStorage.hasOwnProperty("typingData")) {
  //   let typingDataList: InputType[] = JSON.parse(
  //     localStorage.getItem("typingData") as string
  //   );
  //   // 配列の結合
  //   // typingDataList.push(data);
  //   // console.log(typingDataList);
  localStorage.setItem("typingData", JSON.stringify(typingdata));
  // }
};

export default saveTypingData;
