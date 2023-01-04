import { NextPage } from "next";
import { NextSeo } from "next-seo";
import PostedAnnouncementIndex from "../../components/posted-announcement/PostedAnnouncementIndex";
import { ROUTES } from "../../constants/routes";

const PostedAnnouncements: NextPage = () => {
  return (
    <>
      <NextSeo title={ROUTES.POSTED_ANNOUNCEMENTS.name} />
      <PostedAnnouncementIndex />
    </>
  );
};

export default PostedAnnouncements;
