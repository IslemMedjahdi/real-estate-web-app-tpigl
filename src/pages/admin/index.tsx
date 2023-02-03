import { NextPage } from "next";
import { NextSeo } from "next-seo";
import AdminIndex from "../../components/admin/AdminIndex";
import { ROUTES } from "../../constants/routes";

const Admin: NextPage = () => {
  return (
    <>
      <NextSeo title={ROUTES.ADMIN.name} />
      <AdminIndex />
    </>
  );
};

export default Admin;
