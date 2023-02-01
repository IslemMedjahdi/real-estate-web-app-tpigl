import React from "react";
import useAuth from "../../hooks/useAuth";
import { Discussions } from "../../typings/discussions";
import SendMessageForm from "./SendMessageForm";

type Props = {
  messages: Discussions.Message[];
  announcementId: number;
};

const DiscussionMessages: React.FC<Props> = ({ messages, announcementId }) => {
  const { currentUser } = useAuth();

  return (
    <div className="relative h-full w-full">
      <div className="w-full px-2 py-3">
        {messages.map(({ contenu, emetteur, id }) => (
          <div key={id} className="flex items-center gap-2">
            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-hover p-1 text-sm font-medium text-white">
              <img
                src={`https://api.dicebear.com/5.x/bottts/svg?seed=${
                  emetteur.nom + emetteur.prenom + emetteur.email
                }`}
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
      <div className="sticky top-full w-full">
        <SendMessageForm announcementId={announcementId} />
      </div>
    </div>
  );
};

export default DiscussionMessages;
