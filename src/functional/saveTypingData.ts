import { type TypingDataType } from "../@types/ModuleTypes";
import Analyzer from "./Analyzer";

const saveTypingData = (typingdata: TypingDataType): void => {
  let word: string = "";
  let typingDataList: TypingDataType[] = [];
 (async () => {
   for (let i = 0; i < typingdata.problems.length; i++) {
     //APIで変換したいテキスト
     word = typingdata.problems[i].text;
     let convertString = await Analyzer.getConvertString(word);
     typingdata.problems[i].romazi = convertString.romaji; // ローマ字変換
     typingdata.problems[i].kana = convertString.hiragana; // かな変換
     typingdata.problems[i].furigana = convertString.furigana; //ふりがなマークアップ
   }
   typingDataList.push(typingdata);
   // 登録されたデータが有れば取得
   if (localStorage.hasOwnProperty("typingData")) {
     // 今回登録する配列の結合。。（一旦重複しても構わない仕様として実装する）
     let olddata = JSON.parse(localStorage.getItem("typingData") as string);
     typingDataList = [...olddata, typingdata];
    }
    localStorage.setItem("typingData", JSON.stringify(typingDataList));
    console.log(typingDataList);
 })();
};

export default saveTypingData;
