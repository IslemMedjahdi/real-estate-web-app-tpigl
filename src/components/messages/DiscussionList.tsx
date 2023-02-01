import { useMemo, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useMessage from "../../hooks/useMessages";
import DiscussionListItem from "./DiscussionListItem";

type Props = {
  selectedDiscussionId?: number;
  onSelectDiscussion: (id: number) => void;
};

const DiscussionList: React.FC<Props> = ({
  selectedDiscussionId,
  onSelectDiscussion,
}) => {
  const { discussions, loading } = useMessage();
  const { currentUser } = useAuth();

  const [sentDiscussions, recievedDiscussions] = useMemo(() => {
    if (!discussions) return [[], []];
    const sentDiscussions = discussions.filter(
      ({ annonceur }) => annonceur.email !== currentUser?.email
    );
    const recievedDiscussions = discussions.filter(
      ({ annonceur }) => annonceur.email === currentUser?.email
    );
    return [sentDiscussions, recievedDiscussions];
  }, [discussions, currentUser]);

  const [showSentDiscussions, setShowSentDiscussions] = useState(false);

  return (
    <div
      className={`col-span-4 ${
        selectedDiscussionId ? "hidden" : ""
      } h-full w-full divide-y overflow-y-auto border  bg-white shadow  md:col-span-1 md:block`}
    >
      {loading &&
        !discussions &&
        [1, 2, 3, 4, 5, 6, 7, 8, 9].map((_) => (
          <div
            key={_}
            className="flex h-20 w-full animate-pulse cursor-pointer items-center gap-x-2 bg-blue-light  px-2 py-3 transition hover:bg-opacity-50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-hover text-sm font-medium text-white" />
            <div className="flex  flex-col gap-y-2">
              <div className="h-1.5 w-40 bg-gray-300" />
              <div className="h-2 w-32  bg-gray-300" />
              <div className="h-1.5 w-24 bg-gray-300" />
            </div>
          </div>
        ))}
      {!loading && discussions && (
        <div className="flex h-full flex-col divide-y">
          <div className="flex flex-wrap justify-center gap-4 px-2 py-4">
            <button
              onClick={() => setShowSentDiscussions(false)}
              className={`text-white ${
                !showSentDiscussions ? "bg-blue-primary" : "bg-gray-400"
              } rounded-md px-4 py-1.5 text-sm font-medium shadow-sm transition hover:bg-opacity-95`}
            >
              Reçues
            </button>
            <button
              onClick={() => setShowSentDiscussions(true)}
              className={`text-white ${
                showSentDiscussions ? "bg-blue-primary" : "bg-gray-400"
              } rounded-md px-4 py-1.5 text-sm font-medium shadow-sm transition hover:bg-opacity-95`}
            >
              Envoyées
            </button>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-hover">
            {(showSentDiscussions ? sentDiscussions : recievedDiscussions).map(
              ({ annonce, annonceur, demandeur, id, messages }) => (
                <DiscussionListItem
                  key={id}
                  annonce={annonce}
                  annonceur={annonceur}
                  demandeur={demandeur}
                  lastMessage={messages[messages.length - 1].contenu}
                  onClick={() => onSelectDiscussion(id)}
                  selected={selectedDiscussionId === id}
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussionList;
