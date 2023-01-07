import { Announcement } from "../typings/announcement";
import { IMAGES } from "./images";

export const INFO = {
  Title: "Immobilia",
  Icon: IMAGES.Logo,
  Description: "",
  MAX_PRICE: 10000000,
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
};
