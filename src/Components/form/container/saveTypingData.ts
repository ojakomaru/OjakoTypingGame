import { type TypingDataType } from "../../../@types";
import Analyzer from "./Analyzer";
import { Romanizer } from "../../../Util";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../Config";

const saveTypingData = (typingdata: TypingDataType) => {
  let word: string = "";
  const romanizer = new Romanizer();

  /* 入力データの変換処理 */
  (async () => {
    for (let i = 0; i < typingdata.problems.length; i++) {
      //APIで変換したいテキストのトリムと改行削除
      word = typingdata.problems[i].text = typingdata.problems[i].text
        .trim()
        .replace(/\s/g, " ")
        .replace(/\r?\n/g, "");
      const convertString = await Analyzer.getConvertString(word);
      typingdata.problems[i].kana = convertString.hiragana.replace(/␣/g, " "); // かな変換
      typingdata.problems[i].romaji = romanizer
        .romanize(typingdata.problems[i].kana)
        .replace(/\s/g, "␣"); // ローマ字変換
      typingdata.problems[i].typingWords = romanizer.createRomajiWords(
        typingdata.problems[i].kana as string
      ); // タイピングワード変換
      typingdata.problems[i].text = typingdata.problems[i].text.replace(
        /\s/g,
        "␣"
      );
    }

    // typingDataList.push(typingdata);
    /* 登録されたデータが有れば取得してマージ */
    // for (let i = 0; i < typingdatas.length; i++) {
    //   typingdatas[i];
    // }
    // console.log(typingdatas);
    try {
      const obj = JSON.stringify(typingdata);
      const dataRef = doc(db, "typingdatas", typingdata.id);
      setDoc(dataRef, { typingdata: obj });
    } catch (error) {
      console.error("Error adding data: ", error);
    }

    // if (localStorage.hasOwnProperty("typingData")) {
    //   let olddata = JSON.parse(localStorage.getItem("typingData") as string);
    //   // IDが重複しているものがあれば削除して入れ替える
    //   let modIndex = olddata.findIndex(
    //     (data: TypingDataType) => data.id === typingdata.id
    //   );
    //   // いきなりfindIndexを実行すると-1が返って末尾が削除されるためワンクッション
    //   if (modIndex >= 0) {
    //     olddata.splice(modIndex, 1);
    //   }
    //   typingDataList = [...olddata, typingdata];
    // }
    // localStorage.setItem("typingData", JSON.stringify(typingDataList));
  })();
};

export default saveTypingData;
