// type randomArrayArg = {
//   dataLength: number;
//   limit?: number;
// };
export default function randomArray(dataLength: number, limit: number = dataLength) {
  let idx;
  let count = 0;
  let randomAry = [];
  let a = [...Array(dataLength).keys()];
  while (a.length > 0) {
    if(limit < count) continue;
    idx = Math.floor(Math.random() * a.length);
    randomAry.push(a[idx]);
    a.splice(idx, 1);
    count++;
  }
  return randomAry;
}
