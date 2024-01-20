import React from "react";
import axios from "axios";
import useSWR from "swr";
const useFetchPhotos = () => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const url =
    "https://api.unsplash.com/search/photos?query=cat&client_id=WaSxukn8cLzIZMCWdHXql753Uak9wiLM_4lzYNTCe9M";
  const { data, error, isLoading } = useSWR(url, fetcher);
  return {
    photo: data,
    isLoading,
    isError: error,
  };
};
export default useFetchPhotos;
