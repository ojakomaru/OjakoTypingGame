import {
  TypeModeValues,
  RomajiTypeValues,
  ShowRadioFLG,
  OrderValues,
  defaultSetting,
} from "./Setting";
import routes from "./routes";
import {
  app,
  db,
  storage,
  auth,
  githubProvider,
  googleProvider,
} from "./firebase";
import initialData from "./InitialTypingData";

export {
  app,
  storage,
  auth,
  githubProvider,
  googleProvider,
  db,
  routes,
  TypeModeValues,
  RomajiTypeValues,
  ShowRadioFLG,
  OrderValues,
  defaultSetting,
  initialData
};
