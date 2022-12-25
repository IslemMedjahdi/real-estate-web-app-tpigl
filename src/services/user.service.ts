import axios from "../constants/axios";
import { Auth } from "../typings/user";

class UserService {
  private static instance: UserService;
  public static getInstance(): UserService {
    if (!this.instance) {
      this.instance = new UserService();
    }
    return this.instance;
  }

  getUserInfo() {
    const user = localStorage.getItem("@user");
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  setUser(user: Auth.User) {
    localStorage.setItem("@user", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("@user");
  }

  async updateUser() {
    try {
      const response = await axios.get("/auth/me");
      this.setUser(response.data);
      return response;
    } catch (e) {
      throw e;
    }
  }
}

export default UserService;
