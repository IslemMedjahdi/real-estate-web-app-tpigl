import React from "react";
import useAuth from "../../hooks/useAuth";
import Footer from "./footer/Footer";
import Header from "./header/Header";

type Props = {
  withFooter?: boolean;
  withHeader?: boolean;
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({
  children,
  withFooter = false,
  withHeader = true,
}) => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {currentUser && withHeader && <Header />}
      <div>{children}</div>
      {currentUser && withFooter && <Footer />}
    </div>
  );
};

export default Layout;
