/**
 * 文字列を境界値で3点リーダーに変換します
 * @param str 変換する文字列
 * @param limit 変換する文字数の境界
 * @returns 3点リーダーに置換した文字列
 */
export default function strTo3Leader(str: string, limit = 100) {
  const clamp = "…";
  if (str.length > limit) {
    str = str.substring(0, limit - 1) + clamp;
  }
  return str;
}
