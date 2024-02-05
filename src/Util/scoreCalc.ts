export const timeFormatting = (ms: number) => {
  let s = ms / 1000;
  if (s >= 60) {
    const m = Math.floor(s / 60);
    s %= 60;
    return `${m}:${s.toFixed(2)}`;
  }
  return s.toFixed(2);
};

export const wpmToRank = (wpm: number) => {
  if (wpm >= 6000) {
    return '破壊神';
  }
  if (wpm >= 5000) {
    return '伝説の超サイヤ人';
  }
  if (wpm >= 4300) {
    return 'クリリンのことかー！';
  }
  if (wpm >= 3750) {
    return '戦闘力は53万';
  }
  if (wpm >= 3300) {
    return 'サイヤ人';
  }
  if (wpm >= 2850) {
    return 'ザーボンさん';
  }
  if (wpm >= 2400) {
    return 'ドドリアさん';
  }
  if (wpm >= 2000) {
    return 'ナメック星人';
  }
  if (wpm >= 1500) {
    return 'クリリン';
  }
  if (wpm >= 1000) {
    return 'サイバイマン';
  }
  if (wpm >= 50) {
    return 'ヤムチャ';
  }
  return '';
};

export const wpmToComment = (wpm: number) => {
  if (wpm >= 6000) {
    return '全く、脱帽しました。あなたの手の指は何本あるのでしょう？10本より多くあるかもしれません。';
  }
  if (wpm >= 5000) {
    return '素晴らしい！あなたは世界レベルのタイピストです。いまこそ世界にその存在を知らしめるのです！';
  }
  if (wpm >= 4300) {
    return 'なんということでしょう！あなたなら世界も狙えるはずです！';
  }
  if (wpm >= 3750) {
    return '「プロフェッショナル」といったいどれだけの人が呼ばれることができるでしょう？あなたはこの結果を今すぐに自慢するべきです！';
  }
  if (wpm >= 3300) {
    return 'アマチュアとプロの違いは何でしょうか？その違いが分かればもっと上を目指せるかもしれません。';
  }
  if (wpm >= 2850) {
    return '学校や職場ではかなり速いほうでしょう。でも忘れてはいけません。上には上がいるのです！';
  }
  if (wpm >= 2400) {
    return '友達にタイピングの勝負でも挑みますか？気を引き締めて。厳しい戦いになるかもしれません。';
  }
  if (wpm >= 2000) {
    return '可もなく不可もなく。マイペースにいきましょう。';
  }
  if (wpm >= 1500) {
    return 'もっと速くなりたい？楽しいことをおっしゃいますね。地道な努力を重ねることです。';
  }
  if (wpm >= 1000) {
    return 'まずは両手のホームポジションを学びましょう。基礎を固めると成長が速くなるはずです。';
  }
  if (wpm >= 0) {
    return 'ヤムチャならば、、、仕方がないですね。まずは現代の文明に慣れることです。';
  }
  return '';
};
