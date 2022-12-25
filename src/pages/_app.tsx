import { NextSeo } from "next-seo";
import type { AppProps } from "next/app";
import { INFO } from "../constants/info";
import AuthProvider from "../context/AuthContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <NextSeo
        titleTemplate={`${INFO.Title} | %s`}
        description={INFO.Description}
      />
      <Component {...pageProps} />
    </AuthProvider>
  );
}