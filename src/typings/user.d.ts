import { ROLES } from "../constants/roles";

declare module Auth {
  type User = {
    email: string;
    nom: string;
    prenom: string;
    role: ROLES;
    tel?: string;
    adress?: string;
  };
}
