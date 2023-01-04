import { NextPage } from "next";
import { NextSeo } from "next-seo";

import AuthIndex from "../components/auth/AuthIndex";
import { ROUTES } from "../constants/routes";

const Auth: NextPage = () => {
  return (
    <>
      <NextSeo title={ROUTES.AUTH.name} />
      <AuthIndex />
    </>
  );
};

export default Auth;
