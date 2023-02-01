import { Announcement } from "./announcement";
import { Auth } from "./user";

declare module Discussions {
  type DiscussionResume = {
    annonceur: string;
    demandeur: string;
    id: number;
  };

  type Discussion = {
    id: number;
    annonce: Omit<
      Announcement.Announcement,
      "auteur" | "fans" | "photos" | "localisation"
    >;
    annonceur: Auth.User;
    demandeur: Auth.User;
    messages: Message[];
  };

  type Message = {
    contenu: string;
    id: number;
    lu: boolean;
    emetteur: Auth.User;
    objet: string;
  };

  type NewMessage = Message & {
    discussion: DiscussionResume;
  };
}
