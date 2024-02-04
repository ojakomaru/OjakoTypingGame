import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { TypingDataType } from "../@types";
import { db } from "../Config";
import useEffectOnce from "./useEffectOnce";

/**
 * 非同期にてDBからタイピングデータを取得します
 * @description データはJSONで保管されているため変換処理を行っています。また全てのデータを一度に取得しているためループで全件配列に格納し直しています。
 * @returns 取得したタイピングデータの配列
 *          setStateAction
 *          タイピングデータを読み込み中はtrueになる
 *          Fetchに失敗した際のオブジェクト
 */
export default function useGetAllTypingData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | string | null>(null);
  const [typingdatas, setTypingDatas] = useState<TypingDataType[]>([]);
  const getAllTypingDatas = async () => {
    try {
      const typingCollection = collection(db, "typingdatas");
      const querySnapshot = await getDocs(typingCollection);
      const tempJson = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
      const tempAry: TypingDataType[] = [];
      for (let i = 0; i < tempJson.length; i++) {
        tempAry.push(JSON.parse(tempJson[i].typingdata));
      }
      setTypingDatas(tempAry);
      setLoading(false);
    } catch (e) {
      console.log("TypingDataの読み込みに失敗しました", e);
      setError(e as Error);
    }
  };

  useEffectOnce(() => {
    getAllTypingDatas();
  });

  return { typingdatas, setTypingDatas, loading, error };
}
