import { useRouter } from "next/router";
import React, { useState } from "react";

import { ROUTES } from "../../../constants/routes";

import AnnouncementService from "../../../services/annoucement.service";
import { Announcement } from "../../../typings/announcement";
import AnnouncementForm from "./AnnouncementForm";
import LocalisationForm from "./LocalisationForm";
import PhotosPicker from "./PhotosPicker";

const announcementService = AnnouncementService.getInstance();

const AddAnnouncementIndex = () => {
  const router = useRouter();

  const [announcement, setAnnouncement] =
    useState<Announcement.AnnouncementNew>({});
  const [photos, setPhotos] = useState<(Blob | null)[]>([]);
  const [loading, setLoading] = useState(false);

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
      !announcement.prix ||
      !announcement.longitude ||
      !announcement.latitude
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
    bodyFormData.append("longitude", announcement.longitude.toString());
    bodyFormData.append("latitude", announcement.latitude.toString());
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
            <AnnouncementForm
              announcement={announcement}
              onAnnouncementChange={setAnnouncement}
            />
            <hr></hr>
            <PhotosPicker onImageChange={setPhotos} />
            <hr></hr>
            <LocalisationForm
              announcement={announcement}
              onAnnouncementChange={setAnnouncement}
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
