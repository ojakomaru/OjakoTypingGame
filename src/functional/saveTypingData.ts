import { type TypingDataType } from "../@types/ModuleTypes";
import Analyzer from "./Analyzer";
import Romanizer from "./Romanizer";

const saveTypingData = (typingdata: TypingDataType): void => {
  let word: string = "";
  let typingDataList: TypingDataType[] = [];
  const romanizer = new Romanizer({
    mapping: Romanizer.MAPPING_KUNREI,
    chouon: Romanizer.CHOUON_ALPHABET,
    upper: Romanizer.UPPER_ALL,
  });

  /* 入力データの変換処理 */
  (async () => {
    for (let i = 0; i < typingdata.problems.length; i++) {
      //APIで変換したいテキスト
      word = typingdata.problems[i].text.trim().replace(/\s/g, " ");
      let convertString = await Analyzer.getConvertString(word);
      typingdata.problems[i].kana = convertString.hiragana; // かな変換
      typingdata.problems[i].romazi = romanizer.romanize(
        typingdata.problems[i].kana
      ); // ローマ字変換
      typingdata.problems[i].furigana = convertString.furigana; //ふりがなマークアップ
    }
    typingDataList.push(typingdata);
    /* 登録されたデータが有れば取得してマージ */
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
