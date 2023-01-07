import { NextSeo } from "next-seo";
import type { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import Layout from "../components/layout/Layout";
import { INFO } from "../constants/info";
import AuthProvider from "../context/AuthContext";
import "../styles/globals.css";

//Binding events.
NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <NextSeo
        titleTemplate={`${INFO.Title} | %s`}
        description={INFO.Description}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
