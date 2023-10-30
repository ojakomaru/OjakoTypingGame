import { useState } from "react";
import Layout from "../layout/Layout";
import { MainDisplay } from "../MainDisplay/container/MainDisplay";
import TypingLists from "../HomeProblemList/TypingLists";
import { useScroll } from "../../Hooks/useScroll";

export default function Home() {
  const [ishome, setIsHome] = useState<boolean>(true);
  const [ref, moveTo] = useScroll(); //クリック箇所にスクロールするも現在利用していない

  return (
    <Layout>
      <MainDisplay ishome={ishome} setIsHome={setIsHome} />
      <TypingLists />
    </Layout>
  );
}
