import Axios from "axios";
import TokenService from "../services/token.service";

const tokenService = TokenService.getInstance();

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const axios = Axios.create({
  baseURL: BASE_URL,
});

axios.interceptors.request.use(
  (config) => {
    const token = tokenService.getAccessToken();
    if (token) {
      if (config && config.headers)
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
