class TokenService {
  private static instance: TokenService;
  public static getInstance(): TokenService {
    if (!this.instance) {
      this.instance = new TokenService();
    }
    return this.instance;
  }

  getAccessToken() {
    const token = localStorage.getItem("@token");
    if (token) {
      return token;
    }
    return null;
  }

  updateAccessToken(token: string) {
    localStorage.setItem("@token", token);
  }
}

export default TokenService;
