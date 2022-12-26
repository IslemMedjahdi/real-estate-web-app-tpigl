import { useRouter } from "next/router";
import React, { createContext, useEffect, useMemo, useState } from "react";
import Loading from "../components/shared/Loading";
import { ROUTES } from "../constants/routes";
import TokenService from "../services/token.service";
import UserService from "../services/user.service";
import { Auth } from "../typings/user";

const tokenService = TokenService.getInstance();
const userService = UserService.getInstance();

export const AuthContext = createContext<{
  updateUser?: () => Promise<void>;
  currentUser: Auth.User | null | undefined;
  signOut: () => void;
}>({ currentUser: undefined, signOut: () => {} });

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<Auth.User | null | undefined>(
    undefined
  );

  const updateUser = async () => {
    try {
      const response = await userService.updateUser();
      setCurrentUser(response.data);
    } catch (e) {
      throw e;
    }
  };

  const handleAuth = async () => {
    setPageLoading(true);
    if (tokenService.getAccessToken()) {
      if (router.pathname === ROUTES.AUTH.path) {
        await router.replace(ROUTES.HOME.path);
      }
      const user = userService.getUserInfo(); // get user if exist
      if (user) {
        setCurrentUser(user); // get the user
        setPageLoading(false);
      }
      try {
        await updateUser();
        setPageLoading(false);
      } catch (e) {
        console.log(e);
      }
    } else {
      await router.replace(ROUTES.AUTH.path);
      setPageLoading(false);
      setCurrentUser(null);
    }
  };

  const signOut = () => {
    userService.removeUser();
    tokenService.removeAccessToken();
    setCurrentUser(null);
  };

  useEffect(() => {
    handleAuth();
  }, []);

  useEffect(() => {
    const handleRouteChange = async () => {
      if (currentUser !== undefined) {
        if (currentUser === null) {
          await router.replace(ROUTES.AUTH.path);
        } else {
          if (router.pathname === ROUTES.AUTH.path) {
            await router.replace(ROUTES.HOME.path);
          }
        }
      }
    };
    handleRouteChange();
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      if (
        !Object.entries(ROUTES)
          .find(([_, item]) => item.pathname === router.pathname)?.[1]
          .allowedRoles.includes(currentUser.role)
      ) {
        router.replace(ROUTES.HOME.path);
      }
    }
  }, [router.pathname, currentUser]);

  const contextValue = useMemo(
    () => ({ updateUser, currentUser, signOut }),
    [updateUser, currentUser, signOut]
  );

  if (
    pageLoading ||
    currentUser === undefined ||
    (currentUser &&
      !Object.entries(ROUTES)
        .find(([_, item]) => item.pathname === router.pathname)?.[1]
        .allowedRoles.includes(currentUser.role))
  ) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
