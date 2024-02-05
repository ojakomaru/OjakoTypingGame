import axios from "axios";
import useSWR from "swr";

/**
 * 検索文字列を渡してUnsplashからランダムな写真データを取得してきます
 * @param query 検索用のワード
 * @returns 検索ワードで取得した写真データ, 読み込みフラグ, Fetchできなかったときのエラーオブジェクト
 */
const useFetchPhotos = (query: string) => {
  const fetcher = async (url: string) =>
    axios.get(url).then((res) => res.data);
  const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=WaSxukn8cLzIZMCWdHXql753Uak9wiLM_4lzYNTCe9M`;
  const { data, error, isLoading } = useSWR(url, fetcher);
  return {
    photo: data,
    isLoading,
    isError: error,
  };
};
export default useFetchPhotos;
