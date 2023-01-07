import React, { useState } from "react";
import { WILAYAS_FR } from "../../../constants/wilaya_algeria";

import "react-quill/dist/quill.snow.css";
import { ICONS } from "../../../constants/icons";

import dynamic from "next/dynamic";
import LocationService from "../../../services/locations.service";
import { Announcement } from "../../../typings/announcement";
import Select from "../../shared/Select";
import TextInput from "../../shared/TextInput";

const MapPicker = dynamic(() => import("./MapPicker"), { ssr: false });

const locationService = LocationService.getInstance();

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

const LocalisationForm: React.FC<Props> = ({
  announcement,
  onAnnouncementChange,
}) => {
  const [communes, setCommunes] = useState<string[]>([]);

  const onWilayaChange = async (wilaya: string) => {
    setCommunes([]);
    onAnnouncementChange((prev) => ({ ...prev, wilaya }));
    onAnnouncementChange((prev) => ({ ...prev, commune: undefined }));
    if (wilaya) {
      try {
        const response = await locationService.getCommunes(wilaya);
        console.log(response.data);
        const communes = response.data.map(({ commune }: any) => commune);

        setCommunes([""].concat(communes));
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <>
      <h1 className="flex items-center gap-x-2 font-serif text-sm font-medium text-gray-600">
        <ICONS.Map />
        <span>Informations de localisation : </span>
      </h1>
      <div className="grid w-full grid-cols-1 items-center justify-center gap-2 sm:grid-cols-2">
        <Select
          required
          label="Wilaya"
          className="!max-w-none"
          placeholder="Sélectionnez Wilaya"
          options={WILAYAS_FR}
          value={announcement.wilaya || ""}
          onChange={(selected) => {
            onWilayaChange(selected);
          }}
        />
        <Select
          required
          label="Commune"
          className="!max-w-none"
          placeholder="Sélectionnez Commune"
          options={communes}
          disabled={communes.length === 0}
          value={announcement.commune || ""}
          onChange={(selected) =>
            onAnnouncementChange((prev) => ({ ...prev, commune: selected }))
          }
        />
      </div>
      <TextInput
        name="adresse"
        onChange={(e) =>
          onAnnouncementChange((prev) => ({ ...prev, adresse: e.target.value }))
        }
        type="text"
        value={announcement.adresse || ""}
        label="Adresse"
        placeholder="Adresse"
        required
        Icon={ICONS.Map}
      />
      <MapPicker
        onMarkerChange={(lat, lng) =>
          onAnnouncementChange((prev) => ({
            ...prev,
            latitude: lat,
            longitude: lng,
          }))
        }
      />
    </>
  );
};

export default LocalisationForm;
