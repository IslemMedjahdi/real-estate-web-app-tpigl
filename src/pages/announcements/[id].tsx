import { NextPage } from "next";
import AnnouncementPreviewIndex from "../../components/announcements/preview-annoucement/AnnouncementPreviewIndex";
import useAuth from "../../hooks/useAuth";

const AnnouncementPreview: NextPage = () => {
  const { currentUser } = useAuth();
  return <>{currentUser && <AnnouncementPreviewIndex />}</>;
};

export default AnnouncementPreview;
