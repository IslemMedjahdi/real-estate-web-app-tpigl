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
    allowedRoles: [ROLES.ADMIN, ROLES.USER],
    Icon: ICONS.Posted,
  },
  ADD_ANNOUNCEMENT: {
    name: "Ajouter une annonce",
    path: "/posted-announcements/create",
    pathname: "/posted-announcements/create",
    allowedRoles: [ROLES.ADMIN, ROLES.USER],
  },
  FAVORITE_ANNOUNCEMENTS: {
    name: "Annonces préférées",
    path: "/favorite-announcements",
    pathname: "/favorite-announcements",
    allowedRoles: [ROLES.ADMIN, ROLES.USER],
    Icon: ICONS.Favorite,
  },
  ANNOUNCEMENT_BY_ID: {
    name: "Announcement",
    path: "/announcements/",
    pathname: "/announcements/[id]",
    allowedRoles: [ROLES.ADMIN, ROLES.USER],
  },
  MESSAGES: {
    name: "Mes messages",
    path: "/messages",
    pathname: "/messages",
    allowedRoles: [ROLES.ADMIN, ROLES.USER],
    Icon: ICONS.Envelope,
  },
  SETTINGS: {
    name: "Paramètres",
    path: "/settings",
    pathname: "/settings",
    allowedRoles: [ROLES.ADMIN, ROLES.USER],
    Icon: ICONS.Settings,
  },
  ADMIN: {
    name: "Outils d'administration",
    path: "/admin",
    pathname: "/admin",
    allowedRoles: [ROLES.ADMIN],
    Icon: ICONS.Admin,
  },
  SCRAP_ANNOUNCEMENTS: {
    name: "Scrap d'annonces",
    path: "/admin/scraped-announcements",
    pathname: "/admin/scraped-announcements",
    allowedRoles: [ROLES.ADMIN],
    Icon: ICONS.Scrap,
  },
  LIST_USERS: {
    name: "Liste des utilisateurs",
    path: "/admin/users",
    pathname: "/admin/users",
    allowedRoles: [ROLES.ADMIN],
    Icon: ICONS.Users,
  },
};
