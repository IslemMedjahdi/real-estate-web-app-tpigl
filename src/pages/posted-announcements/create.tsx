import { NextPage } from "next";
import { NextSeo } from "next-seo";
import AddAnnouncementIndex from "../../components/add-announcement/AddAnnouncementIndex";
import { ROUTES } from "../../constants/routes";

const AddAnnouncement: NextPage = () => {
  return (
    <>
      <NextSeo title={ROUTES.ADD_ANNOUNCEMENTS.name} />
      <AddAnnouncementIndex />
    </>
  );
};

export default AddAnnouncement;
