import dynamic from "next/dynamic";
import React from "react";

import "react-quill/dist/quill.snow.css";
import { ICONS } from "../../../constants/icons";
import { INFO } from "../../../constants/info";

import { Announcement } from "../../../typings/announcement";
import Select from "../../shared/Select";
import TextInput from "../../shared/TextInput";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type Props = {
  announcement: Announcement.AnnouncementNew;
  onAnnouncementChange: React.Dispatch<
    React.SetStateAction<
      Partial<
        Omit<
          Announcement.Announcement,
          | "id"
          | "messages"
          | "localisation"
          | "photos"
          | "fans"
          | "auteur"
          | "date_publication"
        > &
          Omit<Commun.Localisation, "id">
      >
    >
  >;
};

const AnnouncementForm: React.FC<Props> = ({
  announcement,
  onAnnouncementChange,
}) => {
  return (
    <>
      <h1 className="flex items-center gap-x-2 font-serif text-sm font-medium text-gray-600">
        <ICONS.Category />
        <span>Information d'immobilier : </span>
      </h1>
      <TextInput
        name="titre"
        onChange={(e) =>
          onAnnouncementChange((prev) => ({ titre: e.target.value }))
        }
        type="text"
        value={announcement.titre || ""}
        label="Titre"
        placeholder="Titre"
        required
        Icon={ICONS.Text}
      />
      <Select
        required
        label="Catégorie"
        className="!max-w-none"
        placeholder="Sélectionnez Catégorie"
        options={INFO.IMMOBILIER_CATEGORY}
        value={announcement.categorie || ""}
        onChange={(selected) =>
          onAnnouncementChange((prev) => ({
            ...prev,
            categorie: selected as Announcement.Category,
          }))
        }
      />
      <Select
        required
        label="Type"
        className="!max-w-none"
        placeholder="Sélectionnez Type"
        options={INFO.IMMOBILIER_TYPES}
        value={announcement.type || ""}
        onChange={(selected) =>
          onAnnouncementChange((prev) => ({
            ...prev,
            type: selected,
          }))
        }
      />
      <TextInput
        name="prix"
        onChange={(e) =>
          onAnnouncementChange((prev) => ({
            ...prev,
            prix: parseInt(e.target.value) || 0,
          }))
        }
        type="text"
        value={announcement.prix?.toString() || ""}
        label="Prix"
        placeholder="Prix"
        Icon={ICONS.Price}
        required
      />
      <TextInput
        name="surface"
        type="text"
        value={announcement.surface?.toString() || ""}
        onChange={(e) =>
          onAnnouncementChange((prev) => ({
            ...prev,
            surface: parseInt(e.target.value) || 0,
          }))
        }
        label="Surface"
        placeholder="Surface"
        required
        Icon={ICONS.Surface}
      />
      <div>
        <label
          htmlFor={"description"}
          className="flex items-center gap-x-1 text-sm font-medium text-gray-600 "
        >
          <span>Description</span>
          <span className="text-red-500">*</span>
        </label>
        <ReactQuill
          id="description"
          theme="snow"
          className="mt-2 flex max-h-48 flex-col rounded"
          value={announcement.description}
          onChange={(value) =>
            onAnnouncementChange((prev) => ({ ...prev, description: value }))
          }
        />
      </div>{" "}
    </>
  );
};

export default AnnouncementForm;
