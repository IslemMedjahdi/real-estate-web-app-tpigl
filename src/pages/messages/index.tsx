import { NextPage } from "next";
import { NextSeo } from "next-seo";
import MessagePreviewIndex from "../../components/messages/MessagePreviewIndex";
import { ROUTES } from "../../constants/routes";

const MessagePreview: NextPage = () => {
  return (
    <>
      <NextSeo title={ROUTES.MESSAGES.name} />
      <MessagePreviewIndex />
    </>
  );
};

export default MessagePreview;
