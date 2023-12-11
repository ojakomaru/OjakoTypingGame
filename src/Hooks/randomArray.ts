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
    idx = Math.floor(Math.random() * a.length);
    randomAry.push(a[idx]);
    a.splice(idx, 1);
    count++;
    if(limit <= count) a.length = 0;
  }
  return randomAry;
}
