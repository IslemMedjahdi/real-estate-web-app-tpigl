import { ICONS } from "./icons";
import { ROLES } from "./roles";

export const ROUTES = {
  ERROR: {
    name: "Erreur",
    path: "/error",
    pathname: "/error",
    allowedRoles: [ROLES.ADMIN, ROLES.USER],
  },
  AUTH: {
    name: "Auth",
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
    Icon: ICONS.Posted,
  },
  ADD_ANNOUNCEMENT: {
    name: "Ajouter une annonce",
    path: "/posted-announcements/create",
    pathname: "/posted-announcements/create",
    allowedRoles: [ROLES.USER],
  },
  FAVORITE_ANNOUNCEMENTS: {
    name: "Annonces préférées",
    path: "/favorite-announcements",
    pathname: "/favorite-announcements",
    allowedRoles: [ROLES.USER],
    Icon: ICONS.Favorite,
  },
  ANNOUNCEMENT_BY_ID: {
    name: "Announcement",
    path: "/announcements/",
    pathname: "/announcements/[id]",
    allowedRoles: [ROLES.USER],
  },
  MESSAGES: {
    name: "Mes messages",
    path: "/messages",
    pathname: "/messages",
    allowedRoles: [ROLES.USER],
    Icon: ICONS.Envelope,
  },
  SETTINGS: {
    name: "Paramètres",
    path: "/settings",
    pathname: "/settings",
    allowedRoles: [ROLES.ADMIN, ROLES.USER],
    Icon: ICONS.Settings,
  },
};
