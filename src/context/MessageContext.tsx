import React, { createContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import io, { Socket } from "socket.io-client";
import { ICONS } from "../constants/icons";
import useAuth from "../hooks/useAuth";
import DiscussionsService from "../services/discussions.service";
import TokenService from "../services/token.service";
import { Discussions } from "../typings/discussions";

const tokenService = TokenService.getInstance();
const discussionsService = DiscussionsService.getInstance();
export const MessageContext = createContext<{
  isConnected: boolean;
  sendMessageByAnnouncementId: (
    announcement_id: number,
    contenu: string
  ) => void;
  sendMessageByDiscussionId: (discussion_id: number, contenu: string) => void;
  loading: boolean;
  discussions: Discussions.Discussion[] | null;
}>({
  isConnected: false,
  sendMessageByAnnouncementId: () => {},
  sendMessageByDiscussionId: () => {},
  loading: true,
  discussions: [],
});

let socket: Socket<any>;

const MessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { currentUser } = useAuth();

  const [isConnected, setIsConnected] = useState<boolean>(false);

  const [discussions, setDiscussions] = useState<
    Discussions.Discussion[] | null
  >(null);

  const [loading, setLoading] = useState(true);

  const sendMessageByAnnouncementId = (
    announcement_id: number,
    contenu: string
  ) => {
    socket.send({
      data: {
        announcement_id: announcement_id.toString(),
        objet: "",
        contenu,
      },
      headers: {
        Authorization: "Bearer " + tokenService.getAccessToken(),
      },
    });
    getDiscussions();
  };

  const sendMessageByDiscussionId = (
    discussion_id: number,
    contenu: string
  ) => {
    if (discussions && currentUser) {
      socket.send({
        data: {
          discussion_id: discussion_id.toString(),
          objet: "",
          contenu,
        },
        headers: {
          Authorization: "Bearer " + tokenService.getAccessToken(),
        },
      });

      const discussionIndex = discussions.findIndex(
        ({ id }) => id === discussion_id
      );
      if (discussionIndex !== -1) {
        const newDiscussion = discussions[discussionIndex];
        newDiscussion.messages.push({
          contenu: contenu,
          id:
            Math.floor((1 + Math.random()) * 0x10000) * 10000 +
            Math.floor((1 + Math.random()) * 0x10000),
          objet: "",
          lu: false,
          emetteur: currentUser,
        });
        setDiscussions([
          newDiscussion,
          ...discussions.slice(0, discussionIndex),
          ...discussions.slice(discussionIndex + 1),
        ]);
      }
    }
  };

  const getDiscussions = async () => {
    setLoading(true);
    try {
      const response = await discussionsService.getDiscussions();
      const discussions: Discussions.Discussion[] = response
        .map((res) => res.data)
        .reverse();
      setTimeout(() => {
        setDiscussions(discussions);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDiscussions();
  }, []);

  useEffect(() => {
    if (discussions !== null) {
      socket = io(process.env.NEXT_PUBLIC_BACKEND_URL as string, {
        extraHeaders: {
          Authorization: "Bearer " + tokenService.getAccessToken(),
        },
      });

      socket.on("connect", () => {
        setIsConnected(true);
      });

      socket.on("disconnect", () => {
        setIsConnected(false);
      });

      socket.on("message", async (data: Discussions.NewMessage) => {
        toast.success(
          `nouveau message de ${
            data.emetteur.nom + " " + data.emetteur.prenom
          }`,
          {
            progressClassName: "!bg-blue-primary",
            icon: (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-primary">
                <ICONS.Check className=" text-white" />
              </div>
            ),
          }
        );
        const discussionIndex = discussions.findIndex(
          ({ id }) => id === data.discussion.id
        );
        if (discussionIndex !== -1) {
          const newDiscussion = discussions[discussionIndex];
          newDiscussion.messages.push({
            contenu: data.contenu,
            id: data.id,
            objet: data.objet,
            lu: data.lu,
            emetteur: data.emetteur,
          });
          setDiscussions([
            newDiscussion,
            ...discussions.slice(0, discussionIndex),
            ...discussions.slice(discussionIndex + 1),
          ]);
        } else {
          try {
            const newDiscussion =
              await discussionsService.getReceivedDiscussionById(
                data.discussion.id
              );
            setDiscussions([newDiscussion.data, ...discussions]);
          } catch (e) {
            console.log(e);
          }
        }
      });

      return () => {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("message");
      };
    }
  }, [discussions]);

  const contextValue = useMemo(
    () => ({
      isConnected,
      sendMessageByAnnouncementId,
      loading,
      discussions,
      sendMessageByDiscussionId,
    }),
    [
      isConnected,
      sendMessageByAnnouncementId,
      loading,
      discussions,
      sendMessageByDiscussionId,
    ]
  );

  return currentUser ? (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  ) : (
    <>{children}</>
  );
};

export default MessageProvider;
