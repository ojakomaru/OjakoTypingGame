import React, { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { TypingDataType } from "../@types";
import { db } from "../Config";
import useEffectOnce from "./useEffectOnce";

export default function useGetAllTypingData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | string | null>(null);
  const [typingdatas, setTypingDatas] = useState<TypingDataType[]>([]);
  const getAllTypingDatas = async () => {
    try {
      const typingCollection = collection(db, "typingdatas");
      const querySnapshot = await getDocs(typingCollection);
      const tempJson = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
      let tempAry: TypingDataType[] = [];
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
