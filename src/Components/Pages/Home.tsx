import { useState } from "react";
import Layout from "../layout/Layout";
import { MainDisplay } from "../MainDisplay/container/MainDisplay";
import TypingLists from "../HomeProblemList/TypingLists";

export default function Home() {
  const [ishome, setIsHome] = useState<boolean>(true);

  return (
    <Layout>
      <MainDisplay ishome={ishome} setIsHome={setIsHome} />
      <TypingLists />
    </Layout>
  );
}
