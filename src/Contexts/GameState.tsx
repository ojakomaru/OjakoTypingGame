import React, { useState, ReactNode, createContext } from "react";
import { GAME_STATE, HOME, READY, PLAYING, FINISHED, SETTING } from "../@types";

type ContextProps = {
  gameState: GAME_STATE;
  isHome: React.Dispatch<React.SetStateAction<typeof HOME>>;
  isReady: React.Dispatch<React.SetStateAction<typeof READY>>;
  isPlaying: React.Dispatch<React.SetStateAction<typeof PLAYING>>;
  isFinished: React.Dispatch<React.SetStateAction<typeof FINISHED>>;
  isSetting: React.Dispatch<React.SetStateAction<typeof SETTING>>;
};
export const GameStateContext = createContext<ContextProps>({} as ContextProps);
export const GameStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [gameState, setState] = useState<GAME_STATE>(READY);
  const isHome = () => setState(HOME);
  const isReady = () => setState(READY);
  const isPlaying = () => setState(PLAYING);
  const isFinished = () => setState(FINISHED);
  const isSetting = () => setState(SETTING);

  return (
    <GameStateContext.Provider
      value={{
        gameState,
        isHome,
        isReady,
        isPlaying,
        isFinished,
        isSetting,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};
