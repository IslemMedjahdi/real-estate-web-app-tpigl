import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { ROUTES } from "../constants/routes";

const Home: NextPage = () => {
  return (
    <>
      <NextSeo title={ROUTES.HOME.name} />
      <div>This is home page</div>
    </>
  );
};

export default Home;
