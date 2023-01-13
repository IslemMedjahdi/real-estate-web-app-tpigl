import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ROUTES } from "../../../constants/routes";
import AnnouncementService from "../../../services/annoucement.service";
import { Announcement } from "../../../typings/announcement";
import Loading from "../../shared/Loading";
import BriefInfo from "./BriefInfo";
import ContactForm from "./ContactForm";
import Description from "./Description";
import Gallery from "./Gallery";
import PosterInfo from "./PosterInfo";
import PriceInfo from "./PriceInfo";

const MapView = dynamic(() => import("./MapView"), { ssr: false });

const announcementService = AnnouncementService.getInstance();

const AnnouncementPreviewIndex: React.FC = () => {
  const router = useRouter();

  const [annoucement, setAnnouncement] =
    useState<Announcement.Announcement | null>(null);
  const [loading, setLoading] = useState(true);

  const getAnnouncement = async (id: number) => {
    setLoading(true);
    try {
      const response = await announcementService.getAnnouncementById(id);
      setAnnouncement(response.data);
    } catch (e) {
      await router.push(ROUTES.ERROR.path);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      if (typeof router.query.id === "string") {
        getAnnouncement(parseInt(router.query.id));
      } else {
        router.push(ROUTES.ERROR.path);
      }
    }
  }, [router]);

  return (
    <>
      <NextSeo title={annoucement?.titre || ""} />
      {loading || !annoucement ? (
        <div className="flex h-96 items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="container py-10 px-4">
            <div>
              <h1 className="relative z-10 font-serif text-3xl font-semibold text-gray-900">
                {annoucement.titre}
              </h1>
              <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-6">
                <div className="lg:col-span-4">
                  <div className="flex w-full flex-col rounded-sm bg-white shadow">
                    <Gallery photos={annoucement.photos} />
                    <hr />
                    <div className="flex w-full flex-col items-center justify-center px-4 py-6">
                      <div className="flex w-full max-w-screen-sm  flex-col gap-y-6">
                        <BriefInfo
                          category={annoucement.categorie}
                          surface={annoucement.surface}
                          wilaya={annoucement.localisation.wilaya}
                          commun={annoucement.localisation.commune}
                          adress={annoucement.adresse}
                          createdAt={new Date(
                            annoucement.date_publication
                          ).toUTCString()}
                        />
                        <PriceInfo price={annoucement.prix} />
                        <Description text={annoucement.description || ""} />
                        {annoucement.latitude && annoucement.longitude && (
                          <MapView
                            lat={annoucement.latitude}
                            lng={annoucement.longitude}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="w-full gap-y-4 rounded-sm bg-blue-light  shadow lg:col-span-2">
                    <ContactForm AnnouncementId={annoucement.id} />
                    <hr />
                    <PosterInfo
                      email={annoucement.auteur.email}
                      firstName={annoucement.auteur.nom}
                      lastName={annoucement.auteur.prenom}
                      phone={annoucement.auteur.tel}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnnouncementPreviewIndex;
