import { doc, setDoc } from 'firebase/firestore';
import { type TypingDataType } from '../../../@types';
import Analyzer from './Analyzer';
import { Romanizer } from '../../../Util';
import { db } from '../../../Config';

const saveTypingData = (data: TypingDataType) => {
  const typingdata = data;
  let word: string = '';
  const romanizer = new Romanizer();

  /* 入力データの変換処理 */
  (async () => {
    for (let i = 0; i < typingdata.problems.length; i++) {
      // APIで変換したいテキストのトリムと改行削除
      word = typingdata.problems[i].text;
      word = typingdata.problems[i].text.trim().replace(/\s/g, ' ').replace(/\r?\n/g, '');
      // eslint-disable-next-line no-await-in-loop
      const convertString = await Analyzer.getConvertString(word);
      typingdata.problems[i].kana = convertString.hiragana.replace(/␣/g, ' '); // かな変換
      typingdata.problems[i].romaji = romanizer.romanize(typingdata.problems[i].kana).replace(/\s/g, '␣'); // ローマ字変換
      typingdata.problems[i].typingWords = romanizer.createRomajiWords(typingdata.problems[i].kana as string); // タイピングワード変換
      typingdata.problems[i].text = typingdata.problems[i].text.replace(/\s/g, '␣');
    }

    try {
      const obj = JSON.stringify(typingdata);
      const dataRef = doc(db, 'typingdatas', typingdata.id);
      setDoc(dataRef, { typingdata: obj });
    } catch (error) {
      console.error('Error adding data: ', error);
    }
  })();
};

export default saveTypingData;
