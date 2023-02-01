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

  return (
    <div className="hidden h-full w-full divide-y overflow-y-auto border  bg-white shadow lg:block">
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
      {!loading &&
        discussions &&
        discussions.map(({ annonce, annonceur, demandeur, id, messages }) => (
          <DiscussionListItem
            key={id}
            annonce={annonce}
            annonceur={annonceur}
            demandeur={demandeur}
            lastMessage={messages[messages.length - 1].contenu}
            onClick={() => onSelectDiscussion(id)}
            selected={selectedDiscussionId === id}
          />
        ))}
    </div>
  );
};

export default DiscussionList;
