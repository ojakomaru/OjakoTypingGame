import { createContext } from "react";

interface IThemeMode {
  toggleThemeMode: () => void;
}
export const ThemeModeContext = createContext<IThemeMode>({} as IThemeMode);