import { NextPage } from "next";
import { NextSeo } from "next-seo";

const Home: NextPage = () => {
  return (
    <>
      <NextSeo title="Accueille" />
      <div>This is home page</div>
    </>
  );
};

export default Home;
