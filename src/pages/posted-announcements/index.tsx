import { NextPage } from "next";
import { NextSeo } from "next-seo";
import PostedAnnouncementIndex from "../../components/announcements/posted-announcement/PostedAnnouncementIndex";
import { ROUTES } from "../../constants/routes";
import useAuth from "../../hooks/useAuth";

const PostedAnnouncements: NextPage = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <NextSeo title={ROUTES.POSTED_ANNOUNCEMENTS.name} />
      {currentUser && <PostedAnnouncementIndex />}
    </>
  );
};

export default PostedAnnouncements;
