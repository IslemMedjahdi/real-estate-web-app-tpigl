import Image from "next/image";
import { useEffect } from "react";
import { IMAGES } from "../../constants/images";
import { INFO } from "../../constants/info";
import useGoogleAuth from "../../hooks/useGoogleAuth";

const AuthIndex = () => {
  const { handleGoogle, loading } = useGoogleAuth();

  useEffect(() => {
    const google = (window as any).google;
    if (google) {
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });
      google.accounts.id.renderButton(document.getElementById("authDiv"), {
        type: "standard",
        size: "large",
        text: "continue_with",
        shape: "pill",
      });
      google.accounts.id.prompt();
    }
  }, [handleGoogle]);

  return (
    <div className="grid h-screen grid-cols-1 text-gray-900 md:grid-cols-2">
      <div
        style={{ backgroundImage: `url(${IMAGES.Auth_background})` }}
        className="flex h-full w-full flex-col bg-white  bg-cover bg-no-repeat p-8 md:!bg-none"
      >
        <div className="flex cursor-pointer flex-wrap items-baseline gap-2">
          <Image src={IMAGES.Logo} alt="logo" width={50} height={50} />
          <h1 className="whitespace-nowrap font-serif text-xl font-bold text-white md:text-gray-900">
            {INFO.Title}
          </h1>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <p className="text-center text-lg font-medium text-white md:text-gray-900">
            Connectez vous pour continuer:
          </p>
          {loading ? (
            <div>Loading....</div>
          ) : (
            <div id="authDiv" data-text="continue_with"></div>
          )}
        </div>
      </div>
      <div
        className="hidden h-full w-full bg-cover bg-no-repeat md:block"
        style={{ backgroundImage: `url(${IMAGES.Auth_background})` }}
      />
    </div>
  );
};

export default AuthIndex;
