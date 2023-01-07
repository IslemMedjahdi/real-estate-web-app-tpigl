import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { ICONS } from "../../../constants/icons";
import { INFO } from "../../../constants/info";
import { WILAYAS_FR } from "../../../constants/wilaya_algeria";
import LocationService from "../../../services/locations.service";
import { Announcement } from "../../../typings/announcement";
import Select from "../../shared/Select";
import TextInput from "../../shared/TextInput";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const locationService = LocationService.getInstance();

const AddAnnouncementIndex = () => {
  const [announcement, setAnnouncement] =
    useState<Announcement.AnnouncementNew>({});
  const [communes, setCommunes] = useState<string[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnnouncement((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onWilayaChange = async (wilaya: string) => {
    setCommunes([]);
    setAnnouncement((prev) => ({ ...prev, wilaya }));
    setAnnouncement((prev) => ({ ...prev, commune: undefined }));
    if (wilaya) {
      try {
        const response = await locationService.getCommunes(wilaya);
        const communes = response.data.map(({ commune }: any) => commune);
        setCommunes([""].concat(communes));
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="container px-4">
        <div className="flex justify-center py-10">
          <h1 className="relative z-10 text-center font-serif text-3xl font-semibold text-gray-900 after:absolute after:top-full after:left-0 after:h-2 after:w-full after:origin-left after:skew-y-1 after:animate-reveal after:bg-blue-primary">
            Création d'une annonce
          </h1>
        </div>
        <div className="w-full bg-white shadow">
          <div className="flex flex-col gap-y-4 p-4">
            <h1 className="flex items-center gap-x-2 font-serif text-sm font-medium text-gray-600">
              <ICONS.Category />
              <span>Information d'immobilier : </span>
            </h1>
            <TextInput
              name="titre"
              onChange={onChange}
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
                setAnnouncement((prev) => ({
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
                setAnnouncement((prev) => ({
                  ...prev,
                  type: selected,
                }))
              }
            />
            <TextInput
              name="prix"
              onChange={(e) =>
                setAnnouncement((prev) => ({
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
                setAnnouncement((prev) => ({
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
                  setAnnouncement((prev) => ({ ...prev, description: value }))
                }
              />
            </div>
            <hr></hr>
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
                  setAnnouncement((prev) => ({ ...prev, commune: selected }))
                }
              />
            </div>
            <TextInput
              name="adresse"
              onChange={onChange}
              type="text"
              value={announcement.adresse || ""}
              label="Adresse"
              placeholder="Adresse"
              required
              Icon={ICONS.Map}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAnnouncementIndex;
