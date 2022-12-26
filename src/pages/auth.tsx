import { NextPage } from "next";
import { NextSeo } from "next-seo";

import AuthIndex from "../components/auth/AuthIndex";

const Auth: NextPage = () => {
  return (
    <>
      <NextSeo title="Auth" />
      <AuthIndex />
    </>
  );
};

export default Auth;
