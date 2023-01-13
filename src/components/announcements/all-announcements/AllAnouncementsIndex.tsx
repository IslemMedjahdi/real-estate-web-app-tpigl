import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IMAGES } from "../../../constants/images";
import AnnouncementService from "../../../services/annoucement.service";
import { Announcement } from "../../../typings/announcement";
import Pagination from "../../shared/Pagination";
import AnnoucementsFilters from "../shared/AnnoucementsFilters";
import AnnouncementCard from "../shared/AnnouncementCard";
import AnnouncementCardLoading from "../shared/AnnouncementCardLoading";

const announcementService = AnnouncementService.getInstance();

const AllAnouncementsIndex: React.FC = () => {
  const [announcements, setAnnouncements] = useState<
    Announcement.AnnouncementPart[] | null
  >(null);
  const [pageNum, setPageNum] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<Announcement.AnnouncementFilters>({});

  const getAnnoncementByPage = async (page: number) => {
    setLoading(true);
    const savePage = pageNum;
    setPageNum(page);
    try {
      const response = await announcementService.getAllAnnouncements(
        page,
        filters
      );
      // TODO: REMOVE AFTER DEPLOYING
      setTimeout(() => {
        setAnnouncements(response.data.annonces);
        setNumberOfPages(response.data.num_pages);
        setLoading(false);
      }, 1000);
    } catch (e) {
      setLoading(false);
      setPageNum(savePage);
      console.log(e);
    } finally {
    }
  };

  useEffect(() => {
    getAnnoncementByPage(1);
  }, []);
  return (
    <div className="flex justify-center">
      <div className="container sm:px-4">
        <div className="flex flex-col items-center justify-center gap-y-2 px-4 py-10">
          <h1 className="relative z-10 w-fit text-center font-serif text-3xl font-semibold text-gray-900 after:absolute after:top-full after:left-0 after:h-2 after:w-full after:origin-left after:skew-y-1 after:animate-reveal after:bg-blue-primary">
            Rechercher une offre
          </h1>
        </div>
        <div className="flex w-full flex-col divide-y  bg-white shadow">
          <div className="w-full bg-blue-light p-4">
            <AnnoucementsFilters
              filters={filters}
              onFilterChange={setFilters}
              onSubmit={() => getAnnoncementByPage(1)}
            />
          </div>
          <div className="grid w-full grid-cols-1  gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {loading || !announcements ? (
              [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <AnnouncementCardLoading key={item} />
              ))
            ) : announcements.length === 0 ? (
              <div className="col-span-full flex w-full flex-col items-center gap-y-8 py-8">
                <p className="relative font-serif text-2xl font-semibold after:absolute after:top-full after:left-0  after:h-1 after:w-full after:origin-left after:skew-y-[0.5deg]  after:bg-blue-primary after:transition after:duration-300 hover:after:scale-x-100">
                  Il n'y a pas d'annonce
                </p>
                <Image
                  src={IMAGES.NO_ANNOUNCEMENTS}
                  alt="no-announcements"
                  width={500}
                  height={500}
                  className="object-contain"
                />
              </div>
            ) : (
              announcements.map(
                ({
                  id,
                  photos,
                  titre,
                  prix,
                  localisation,
                  categorie,
                  date_publication,
                }) => (
                  <AnnouncementCard
                    key={id}
                    id={id}
                    photos={photos}
                    title={titre}
                    price={prix}
                    localisation={localisation}
                    category={categorie}
                    createdAt={date_publication}
                  />
                )
              )
            )}
          </div>
          {numberOfPages > 0 && (
            <div className="p-4">
              <Pagination
                selectedPage={pageNum}
                numberPages={numberOfPages}
                onPageClick={getAnnoncementByPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllAnouncementsIndex;
