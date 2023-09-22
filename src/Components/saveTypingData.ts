import axios from "axios";
import { type InputType } from "../@types/PagesTypes";
import Romanizer from "js-hira-kata-romanize";
// import Kuroshiro from "kuroshiro";
// import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";

const saveTypingData = (typingdata: InputType): void => {
  // const kuroshiro = new Kuroshiro();
  // kuroshiro
  //   .init(new KuromojiAnalyzer())
  //   .then(function () {
  //     return kuroshiro.convert(
  //       "感じ取れたら手を繋ごう、重なるのは人生のライン and レミリア最高！",
  //       { to: "hiragana" }
  //     );
  //   })
  //   .then(function (result: any) {
  //     console.log(result);　半角数字テスト1234567890
  //   });　この品物は$400ですが、本当は￥いくらですか？また「バナナ＆いちご１００％！」かしら
  const romanizer = new Romanizer({
    mapping: Romanizer.MAPPING_KUNREI,
    chouon: Romanizer.CHOUON_SKIP,
    upper: Romanizer.UPPER_ALL,
  });
  let apiUrl: string = "";
  let word: string = "";
  typingdata.problems.map((problem) => {
    //gooひらがなAPIに必要な情報を記載し、HTTP POSTするための設定
    apiUrl = "https://labs.goo.ne.jp/api/hiragana";
    //gooひらがな化APIで変換したいテキスト
    word = problem.text;
    let payload = {
      app_id:
        "932681ca25180b398a951d1e63f4791bc7575ff9e510af74e96f5a9ea0bc5938",
      sentence: word,
      output_type: "hiragana",
    };
    axios
      .post(apiUrl, payload)
      .then((results) => {
        problem.kana = results.data["converted"]; // かな変換
        problem.romazi = romanizer.romanize(problem.kana); // ローマ字変換
      })
      .catch((error) => console.log("失敗したようです。", error.status));
  });
  console.log(typingdata.problems);

  // 登録されたデータが有れば取得
  // if (localStorage.hasOwnProperty("typingData")) {
  //   let typingDataList: InputType[] = JSON.parse(
  //     localStorage.getItem("typingData") as string
  //   );
  //   // 配列の結合
  //   // typingDataList.push(data);
  //   // console.log(typingDataList);
  //   localStorage.setItem("typingData", JSON.stringify(typingDataList));
  // }
};

export default saveTypingData;
