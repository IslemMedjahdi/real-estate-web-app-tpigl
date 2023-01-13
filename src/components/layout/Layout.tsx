import React from "react";
import { ToastContainer } from "react-toastify";
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
  withFooter = true,
  withHeader = true,
}) => {
  const { currentUser } = useAuth();

  return (
    <div className="bg-gray-50 text-gray-800">
      <div className="flex min-h-screen flex-col ">
        {currentUser && withHeader && <Header />}
        <div id="main" className="flex flex-1 flex-col">
          {children}
          <ToastContainer />
        </div>
      </div>
      {currentUser && withFooter && <Footer />}
    </div>
  );
};

export default Layout;
