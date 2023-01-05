import { NextPage } from "next";
import { NextSeo } from "next-seo";
import AddAnnouncementIndex from "../../components/announcements/add-announcement/AddAnnouncementIndex";
import { ROUTES } from "../../constants/routes";

const AddAnnouncement: NextPage = () => {
  return (
    <>
      <NextSeo title={ROUTES.ADD_ANNOUNCEMENT.name} />
      <AddAnnouncementIndex />
    </>
  );
};

export default AddAnnouncement;
