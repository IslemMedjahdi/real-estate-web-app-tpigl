import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ImagePickerConf } from "react-image-picker-editor";
import "react-image-picker-editor/dist/index.css";
import "react-quill/dist/quill.snow.css";
import { ICONS } from "../../../constants/icons";
import { INFO } from "../../../constants/info";
import { ROUTES } from "../../../constants/routes";

import { WILAYAS_FR } from "../../../constants/wilaya_algeria";
import AnnouncementService from "../../../services/annoucement.service";
import LocationService from "../../../services/locations.service";
import { Announcement } from "../../../typings/announcement";
import Select from "../../shared/Select";
import TextInput from "../../shared/TextInput";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const ReactImagePickerEditor = dynamic(
  () => import("react-image-picker-editor"),
  { ssr: false }
);

const locationService = LocationService.getInstance();
const announcementService = AnnouncementService.getInstance();

const config2: ImagePickerConf = {
  borderRadius: "8px",
  language: "en",
  width: "100%",
  height: "8rem",
  objectFit: "cover",
  compressInitial: null,
  hideEditBtn: true,
  hideDownloadBtn: true,
  hideAddBtn: true,
};

const AddAnnouncementIndex = () => {
  const router = useRouter();

  const [announcement, setAnnouncement] =
    useState<Announcement.AnnouncementNew>({});
  const [photos, setPhotos] = useState<(Blob | null)[]>([]);
  const [communes, setCommunes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !announcement.titre ||
      !announcement.description ||
      !announcement.adresse ||
      !announcement.categorie ||
      !announcement.type ||
      !announcement.commune ||
      !announcement.wilaya ||
      !announcement.surface ||
      !announcement.prix
    ) {
      return;
    }
    setLoading(true);
    const bodyFormData = new FormData();
    bodyFormData.append("titre", announcement.titre);
    bodyFormData.append("description", announcement.description);
    bodyFormData.append("adresse", announcement.adresse);
    bodyFormData.append("categorie", announcement.categorie);
    bodyFormData.append("type", announcement.type);
    bodyFormData.append("wilaya", announcement.wilaya);
    bodyFormData.append("commune", announcement.commune);
    bodyFormData.append("surface", announcement.surface.toString());
    bodyFormData.append("prix", announcement.prix.toString());
    photos.forEach(async (photo, index) => {
      if (photo) {
        bodyFormData.append("photos", photo, `image${index}.jpg`);
      }
    });
    try {
      const response = await announcementService.createAnnouncement(
        bodyFormData
      );
      router.push(ROUTES.POSTED_ANNOUNCEMENTS.path);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
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
        <form onSubmit={onSubmit} className="w-full bg-white shadow">
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
            <div>
              <label
                htmlFor={"description"}
                className="flex items-center gap-x-1 text-sm font-medium text-gray-600 "
              >
                <span>Photos</span>
                <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-4 md:justify-start">
                {[0, 1, 2, 3].map((item) => (
                  <div className="w-full max-w-[12rem] grow" key={item}>
                    <ReactImagePickerEditor
                      config={config2}
                      imageChanged={async (newDataUri: any) => {
                        const blob = newDataUri
                          ? await (await fetch(newDataUri)).blob()
                          : null;
                        setPhotos((prev) => {
                          let newPhotos = [...prev];
                          newPhotos[item] = blob;
                          return newPhotos;
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
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
          <hr />
          <div className="flex justify-end p-4">
            <button
              disabled={
                !announcement.titre ||
                !announcement.description ||
                !announcement.adresse ||
                !announcement.categorie ||
                !announcement.type ||
                !announcement.commune ||
                !announcement.wilaya ||
                !announcement.surface ||
                !announcement.prix
              }
              type="submit"
              className={`${
                loading ? "animate-pulse" : ""
              } rounded-sm bg-blue-primary px-6 py-2 text-sm font-medium text-white transition duration-200 hover:bg-blue-hover disabled:bg-blue-hover`}
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAnnouncementIndex;
