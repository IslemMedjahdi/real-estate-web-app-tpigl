import React from "react";
import useAuth from "../../hooks/useAuth";
import { Announcement } from "../../typings/announcement";
import { Auth } from "../../typings/user";

type Props = {
  onClick: () => void;
  selected: boolean;
  annonceur: Auth.User;
  demandeur: Auth.User;
  lastMessage: string;
  annonce: Omit<
    Announcement.Announcement,
    "auteur" | "fans" | "photos" | "localisation"
  >;
};

const DiscussionListItem: React.FC<Props> = ({
  onClick,
  selected,
  annonceur,
  demandeur,
  lastMessage,
  annonce,
}) => {
  const { currentUser } = useAuth();
  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer ${
        selected ? "bg-blue-light" : ""
      }  items-center gap-2  px-2  py-3 transition duration-300 last:!border-b  hover:bg-blue-light`}
    >
      <div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-hover text-sm font-medium text-white">
          <img
            src={`https://api.dicebear.com/5.x/shapes/svg?seed=${
              annonceur.email === currentUser?.email
                ? demandeur.email
                : annonceur.email
            }`}
            alt="avatar"
            className="h-full w-full rounded-full"
          />
        </div>
      </div>
      <div className="flex w-full flex-col gap-y-1">
        <p className="w-fit text-sm font-medium text-blue-primary">
          {annonce.titre.substring(0, 40)} {annonce.titre.length > 40 && "..."}{" "}
        </p>
        <p className="text-sm font-medium text-slate-800">
          <span>Avec:</span>{" "}
          {annonceur.email === currentUser?.email
            ? demandeur.nom + " " + demandeur.prenom
            : annonceur.nom + " " + annonceur.prenom}
        </p>
        <p className="text-xs text-slate-600">
          {lastMessage.substring(0, 40)} {lastMessage.length > 40 && "..."}
        </p>
      </div>
    </div>
  );
};

export default DiscussionListItem;
