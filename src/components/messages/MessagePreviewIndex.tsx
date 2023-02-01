import Image from "next/image";
import { useMemo, useState } from "react";
import { IMAGES } from "../../constants/images";
import useAuth from "../../hooks/useAuth";
import useMessage from "../../hooks/useMessages";
import DiscussionList from "./DiscussionList";
import DiscussionMessages from "./DiscussionMessages";

const MessagePreviewIndex: React.FC = () => {
  const { discussions, loading } = useMessage();
  const { currentUser } = useAuth();
  const [selectedDiscussionId, setSelectedDiscussionId] = useState<
    number | undefined
  >(undefined);

  const discussion = useMemo(
    () => discussions?.find(({ id }) => id === selectedDiscussionId),
    [selectedDiscussionId]
  );

  return (
    <div className="flex h-full flex-1 justify-center">
      <div className="container px-4">
        <div className="flex flex-col items-center justify-center gap-y-2 px-4 py-10">
          <h1 className="relative z-10 w-fit text-center font-serif text-3xl font-semibold text-gray-900 after:absolute after:top-full after:left-0 after:h-2 after:w-full after:origin-left after:skew-y-1 after:animate-reveal after:bg-blue-primary">
            Mes messages
          </h1>
        </div>
        <div className="grid h-[80vh] grid-cols-4">
          <DiscussionList
            selectedDiscussionId={selectedDiscussionId}
            onSelectDiscussion={(id) => setSelectedDiscussionId(id)}
          />
          <div
            className={`relative col-span-4 ${
              !selectedDiscussionId ? "hidden" : "block"
            } h-[80vh] w-full overflow-auto bg-white shadow md:block lg:col-span-3`}
          >
            {selectedDiscussionId ? (
              <DiscussionMessages
                discussionWith={
                  discussion?.annonceur.email === currentUser?.email
                    ? discussion?.demandeur
                    : discussion?.annonceur
                }
                messages={discussion?.messages || []}
                discussion_id={discussion?.id || 0}
                showDiscussionList={() => setSelectedDiscussionId(undefined)}
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Image
                  src={IMAGES.DISCUSSIONS}
                  alt="discussions"
                  width={300}
                  height={300}
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePreviewIndex;
