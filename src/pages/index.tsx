import { NextPage } from "next";
import { NextSeo } from "next-seo";
import AllAnouncementsIndex from "../components/announcements/all-announcements/AllAnouncementsIndex";
import { ROUTES } from "../constants/routes";

const Home: NextPage = () => {
  return (
    <>
      <NextSeo title={ROUTES.HOME.name} />
      <AllAnouncementsIndex />
    </>
  );
};

export default Home;
