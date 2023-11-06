import { SettingTypes } from "../../../../@types";

const saveSettingData = (data: SettingTypes): void => {
  localStorage.setItem("settingData", JSON.stringify(data));
  console.log(data);
}
export default saveSettingData;