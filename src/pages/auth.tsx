import { NextSeo } from "next-seo";

import AuthIndex from "../components/auth/AuthIndex";

const Auth = () => {
  return (
    <>
      <NextSeo title="Auth" />
      <AuthIndex />
    </>
  );
};

export default Auth;
