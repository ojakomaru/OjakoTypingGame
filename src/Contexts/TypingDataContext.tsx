import React, { ReactNode, createContext, useState, useEffect } from 'react';
import { useGetAllTypingData } from '../Hooks';
import { TypingDataType, TypingGameData } from '../@types';
import { initialData } from '../Config';

export const TypingDataContext = createContext<TypingGameData>({} as TypingGameData);

export const TypingDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 登録済みのデータの取得
  const { typingdatas, setTypingDatas, loading, error } = useGetAllTypingData();
  const [typingdata, setTypingData] = useState<TypingDataType>(initialData);

  // メイン画面にタイピングデータを渡す
  useEffect(() => {
    if (typingdatas) {
      const rnd = Math.floor(Math.random() * typingdatas.length);
      setTypingData(typingdatas[rnd]);
    }
  }, [typingdatas]);

  return (
    <TypingDataContext.Provider
      value={{
        typingdata,
        setTypingData,
        typingdatas,
        setTypingDatas,
        loading,
        error,
      }}
    >
      {children}
    </TypingDataContext.Provider>
  );
};
