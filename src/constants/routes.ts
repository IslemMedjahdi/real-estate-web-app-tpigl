import { ROLES } from "./roles";

export const ROUTES = {
  AUTH: {
    path: "/auth",
    pathname: "/auth",
    allowedRoles: [] as ROLES[],
  },
  HOME: {
    path: "/",
    pathname: "/",
    allowedRoles: [ROLES.ADMIN, ROLES.USER] as ROLES[],
  },
};
