import { ERole } from "../constant/Roles";

export class AuthUtil {
  static isAdmin = (auth) => {
    return !!(auth?.isAuthenticated && auth?.user?.role === ERole.ADMIN);
  };
  static getRole = (auth) => {
    if (auth?.isAuthenticated && auth?.user?.role) {
      return auth?.user?.role;
    }
    return null;
  };
  static getLoggedInUserId = (auth) => {
    if (auth?.isAuthenticated && auth?.user?.id) {
      return auth?.user?.id;
    }
    return null;
  };
}
