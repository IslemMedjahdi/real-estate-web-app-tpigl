import { NextPage } from "next";
import { NextSeo } from "next-seo";
import AddAnnouncementIndex from "../../components/announcements/add-announcement/AddAnnouncementIndex";
import { ROUTES } from "../../constants/routes";
import useAuth from "../../hooks/useAuth";

const AddAnnouncement: NextPage = () => {
  const { currentUser } = useAuth();
  return (
    <>
      <NextSeo title={ROUTES.ADD_ANNOUNCEMENT.name} />
      {currentUser && <AddAnnouncementIndex />}
    </>
  );
};

export default AddAnnouncement;
