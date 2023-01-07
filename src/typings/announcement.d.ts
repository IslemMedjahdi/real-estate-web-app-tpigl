import { Auth } from "./user";

declare module Announcement {
  type Announcement = {
    id: number;
    type?: string;
    surface?: number;
    description?: string;
    prix: number;
    categorie: Category;
    auteur: Auth.User;
    fans?: Auth.User[];
    photos: Commun.Image[];
    titre: string;
    localisation: Commun.Localisation;
    messages: unknown[];
    date_publication: Date;
    adresse: string;
  };

  type Category = "Vente" | "Echange" | "Location" | "Location pour vacances";

  type AnnouncementPart = Omit<Announcement, "fans" | "auteur" | "messages">;

  type AnnouncementFilters = {
    search?: string;
    type?: string;
    wilaya?: string;
    commune?: string;
    createAtStart?: Date;
    createdAtEnd?: Date;
    start_price?: number;
    end_price?: number;
  };
}
