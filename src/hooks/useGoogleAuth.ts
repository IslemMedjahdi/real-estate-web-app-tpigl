import { useState } from "react";
import AuthService from "../services/auth.service";
import TokenService from "../services/token.service";
import useAuth from "./useAuth";

const authService = AuthService.getInstance();
const tokenService = TokenService.getInstance();

const useGoogleAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { updateUser } = useAuth();

  const handleGoogle = async (response: any) => {
    setLoading(true);
    try {
      const res = await authService.postGoogleCredential(response.credential);
      tokenService.updateAccessToken(res.data.token);
      updateUser && (await updateUser());
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return { loading, handleGoogle };
};

export default useGoogleAuth;
