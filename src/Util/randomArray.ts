/**
 * 任意の件数ランダムな配列数値を入れた配列を返す
 * 例 [2, 1, 6, 3, 5, 4, 0]
 * @param dataLength 作成するランダム件数になる
 * @param limit 任意の件数制限
 * @returns Array<number>
 */
export default function randomArray(dataLength: number, limit: number = dataLength) {
  let idx;
  let count = 0;
  let randomAry = [];
  let a = [...Array(dataLength).keys()];
  while (a.length > 0) {
    idx = Math.floor(Math.random() * a.length);
    randomAry.push(a[idx]);
    a.splice(idx, 1);
    count++;
    if(limit <= count) a.length = 0;
  }
  return randomAry;
}
