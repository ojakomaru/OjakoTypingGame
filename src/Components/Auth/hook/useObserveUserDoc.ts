import { User } from "firebase/auth";
import {
  doc,
  DocumentData,
  DocumentSnapshot,
  FirestoreError,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../Config";

const useObserveUserDoc = (user: User | null) => {
  const [userDocData, setUserDocData] = useState<DocumentData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | string | null>(null);

  // onSnapshotで正常にdocを取得できた場合の処理
  const handleDoc = (doc: DocumentSnapshot<DocumentData>) => {
    // もしドキュメントがちゃんとあれば
    if (doc.exists()) {
      const data = doc.data();
      setUserDocData(data);
    }
    // ドキュメントがなければ
    else {
      setError("ドキュメントがありません");
    }
    setIsLoading(false);
  };

  // onSnapshotでdocが取得できなかったときの処理
  const handleError = (error: FirestoreError) => {
    setError(error);
    console.log("onSnapshotでのエラーです", error);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      const unsubscribed = onSnapshot(
        doc(db, "Users", user.uid),
        handleDoc,
        handleError
      );
      return unsubscribed;
    } else {
      setIsLoading(false);
      setUserDocData(null);
    }
  }, [user]);

  return { userDocData, isLoading, error };
};

export default useObserveUserDoc;
