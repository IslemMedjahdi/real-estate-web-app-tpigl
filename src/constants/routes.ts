import { ROLES } from "./roles";

export const ROUTES = {
  AUTH: {
    name: "auth",
    path: "/auth",
    pathname: "/auth",
    allowedRoles: [] as ROLES[],
  },
  HOME: {
    name: "Acceuille",
    path: "/",
    pathname: "/",
    allowedRoles: [ROLES.ADMIN, ROLES.USER],
  },
  POSTED_ANNOUNCEMENTS: {
    name: "Annonces déposées",
    path: "/posted-announcements",
    pathname: "/posted-announcements",
    allowedRoles: [ROLES.USER],
  },
  FAVORITE_ANNOUNCEMENTS: {
    name: "Annonces préférées",
    path: "/favorite-announcements",
    pathname: "/favorite-announcements",
    allowedRoles: [ROLES.USER],
  },
  MESSAGES: {
    name: "Mes messages",
    path: "/messages",
    pathname: "/messages",
    allowedRoles: [ROLES.USER],
  },
};
