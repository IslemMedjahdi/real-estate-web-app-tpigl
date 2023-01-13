import { NextPage } from "next";
import { NextSeo } from "next-seo";
import AllAnouncementsIndex from "../components/announcements/all-announcements/AllAnouncementsIndex";
import { ROUTES } from "../constants/routes";
import useMessage from "../hooks/useMessages";

const Home: NextPage = () => {
  const { isConnected } = useMessage();

  console.log(isConnected);

  return (
    <>
      <NextSeo title={ROUTES.HOME.name} />
      <AllAnouncementsIndex />
    </>
  );
};

export default Home;
