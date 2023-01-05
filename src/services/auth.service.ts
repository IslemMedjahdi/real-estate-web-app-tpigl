import axios from "../constants/axios";

class AuthService {
  private static instance: AuthService;
  public static getInstance(): AuthService {
    if (!this.instance) {
      this.instance = new AuthService();
    }
    return this.instance;
  }
  constructor() {
    console.log("AuthService constructor");
  }

  public async postGoogleCredential(credentials: string) {
    try {
      const res = await axios.post("/auth/", JSON.stringify({ credentials }));
      return res;
    } catch (e) {
      throw e;
    }
  }
}

export default AuthService;
