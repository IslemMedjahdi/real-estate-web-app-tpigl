import { Auth } from "./user";

declare module Announcement {
  type Announcement = {
    id: number;
    type?: string;
    surface?: number;
    description?: string;
    prix: number;
    categorie: Category;
    auteur: Auth.User[];
    fans?: Auth.User[];
    photos: Commun.Image[];
  };

  type Category = "Vente" | "Echange" | "Location" | "Location pour vacances";

  type AnnouncementPart = Omit<Announcement, "photos" | "fans" | "auteur"> & {
    photos: Commun.Image[];
  };
}
