import { ROLES } from "../constants/roles";

declare module Auth {
  type User = {
    email: string;
    firstName: string;
    lastName: string;
    role: ROLES;
  };
}
