import { NextSeo } from "next-seo";
import ScrapAnnoucenemntIndex from "../../components/admin/ScrapAnnoucenemntIndex";
import { ROUTES } from "../../constants/routes";

const ScrapAnnoucenemnt = () => {
  return (
    <>
      <NextSeo title={ROUTES.SCRAP_ANNOUNCEMENTS.name} />
      <ScrapAnnoucenemntIndex />
    </>
  );
};

export default ScrapAnnoucenemnt;
