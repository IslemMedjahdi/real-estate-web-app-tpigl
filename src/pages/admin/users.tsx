import { NextPage } from "next";
import { NextSeo } from "next-seo";
import UsersIndex from "../../components/admin/UsersIndex";
import { ROUTES } from "../../constants/routes";

const users: NextPage = () => {
  return (
    <>
      <NextSeo title={ROUTES.LIST_USERS.name} />
      <UsersIndex />
    </>
  );
};

export default users;
