import React from "react";
import { ICONS } from "../../../constants/icons";
import { Announcement } from "../../../typings/announcement";

type Props = {
  category: Announcement.Category;
  surface?: number;
  wilaya: string;
  commun: string;
  adress: string;
  createdAt: string;
};

const BriefInfo: React.FC<Props> = ({
  category,
  surface,
  wilaya,
  commun,
  adress,
  createdAt,
}) => {
  return (
    <div className="flex flex-col gap-y-6 text-gray-800">
      <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-4 ">
        <div className="flex items-center gap-4">
          <ICONS.Category className="text-2xl text-blue-primary" />
          <p className="font-serif font-bold">{category}</p>
        </div>
        <div className="flex items-center gap-4">
          <ICONS.Surface className="text-2xl text-blue-primary" />
          <p className="font-serif font-bold">{surface + " m²" || "Inconné"}</p>
        </div>
        <div className="flex items-center gap-4">
          <ICONS.Map className="text-2xl text-blue-primary" />
          <p className="font-serif font-bold">
            {commun}, {wilaya}
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="font-serif">
          <span className="text-lg font-bold">Adresse: </span> {adress}
        </p>
        <p className="mt-2 font-serif">
          <span className="text-lg font-bold">Date de publication: </span>
          {createdAt}
        </p>
      </div>
    </div>
  );
};

export default BriefInfo;
