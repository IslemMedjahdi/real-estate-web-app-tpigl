import { Announcement } from "../typings/announcement";
import { IMAGES } from "./images";

export const INFO = {
  Title: "Immobilia",
  Icon: IMAGES.Logo,
  Description: "",
  MAX_PRICE: 1000000000,
  IMMOBILIER_TYPES: [
    "Terrain",
    "Terrain Agricole",
    "Appartement",
    "Maison",
    "Bungalow",
    "Autre",
  ],
  IMMOBILIER_CATEGORY: [
    "Vente",
    "Echange",
    "Location",
    "Location pour vacances",
  ] as Announcement.Category[],
  adress: "Dar El-Baida, office 2, 10000, Algiers, Algeria",
  email: "contact@immobilia.dz",
  phone_number: "+213 559 59 41 60",
  social_media_links: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    youtube: "#",
  },
};
