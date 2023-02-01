import React, { useEffect, useRef } from "react";
import { ICONS } from "../../constants/icons";
import useAuth from "../../hooks/useAuth";
import { Discussions } from "../../typings/discussions";
import { Auth } from "../../typings/user";
import SendMessageForm from "./SendMessageForm";

type Props = {
  messages: Discussions.Message[];
  discussion_id: number;
  discussionWith?: Auth.User;
  showDiscussionList: () => void;
};

const DiscussionMessages: React.FC<Props> = ({
  messages,
  discussion_id,
  discussionWith,
  showDiscussionList,
}) => {
  const { currentUser } = useAuth();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo(0, ref.current?.scrollHeight);
  }, [discussion_id]);

  return (
    <div className="relative flex h-full w-full flex-col">
      <div className="flex items-center gap-x-2 border bg-white px-4 py-3">
        <div
          role={"button"}
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition hover:bg-gray-50 md:hidden"
          onClick={showDiscussionList}
        >
          <ICONS.CHEVRON_LEFT className="text-sm font-medium" />
        </div>
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-hover p-1 text-sm font-medium text-white">
          <img
            src={`https://api.dicebear.com/5.x/bottts/svg?seed=${
              discussionWith?.email || ""
            }`}
            alt="avatar"
            className="h-full w-full rounded-full"
          />
        </div>
        <p className="text-sm font-semibold">
          {discussionWith?.nom} {discussionWith?.prenom}
        </p>
      </div>
      <div
        ref={ref}
        className="w-full flex-1 overflow-auto px-4 py-3 scrollbar-thin scrollbar-thumb-blue-hover"
      >
        {messages.map(({ contenu, emetteur, id }) => (
          <div
            key={id}
            className={`flex ${
              currentUser?.email === emetteur.email ? "flex-row-reverse" : ""
            } items-center gap-2`}
          >
            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-hover p-1 text-sm font-medium text-white">
              <img
                src={`https://api.dicebear.com/5.x/bottts/svg?seed=${emetteur.email}`}
                alt="avatar"
                className="h-full w-full rounded-full"
              />
            </div>
            <div
              className={`${
                currentUser?.email === emetteur.email
                  ? "bg-blue-primary"
                  : "bg-blue-hover"
              } my-2 w-fit  rounded-lg p-2 text-sm text-white transition hover:bg-opacity-95`}
            >
              {contenu}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full">
        <SendMessageForm discussion_id={discussion_id} />
      </div>
    </div>
  );
};

export default DiscussionMessages;
