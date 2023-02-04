import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Autoplay } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { ICONS } from "../../constants/icons";
import { IMAGES } from "../../constants/images";
import { ROUTES } from "../../constants/routes";
import AnnouncementService from "../../services/annoucement.service";
import { Announcement } from "../../typings/announcement";
import { supportedNextjsImageUrl } from "../../utils/lib";
import Loading from "../shared/Loading";

const announcementService = AnnouncementService.getInstance();

const columns: TableColumn<Announcement.AnnouncementScrap>[] = [
  {
    name: "N",
    cell: (_, index) => (
      <span className="text-sm font-medium">{index + 1}</span>
    ),
    selector: (_, index) => index || 0,
    sortable: true,
    width: "1rem",
  },
  {
    name: "Photos",
    cell: (row, index) => (
      <>
        {row.photos && row.photos.length > 0 ? (
          <>
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                delay: index % 2 ? 3000 : 4000,
              }}
            >
              {row.photos.map((picture, index) => (
                <SwiperSlide key={index} className="!w-full overflow-hidden">
                  <Image
                    src={supportedNextjsImageUrl(picture)}
                    alt="no-image"
                    className="aspect-video h-36  object-cover"
                    width={720}
                    height={480}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        ) : (
          <Image
            src={IMAGES.NO_IMAGE}
            alt="no-image"
            className="pointer-events-none aspect-video h-36 object-cover"
            width={720}
            height={480}
          />
        )}
      </>
    ),
    grow: 3,
  },
  {
    name: "Titre",
    cell: (row) => (
      <p className="text-sm font-medium">{row.titre || "indéfini"}</p>
    ),
    selector: (row) => row.titre || "indéfini",
    sortable: true,
    reorder: true,
    grow: 1.5,
  },
  {
    name: "Catégorie",
    cell: (row) => <p className="text-sm font-medium">{row.categorie}</p>,
    selector: (row) => row.categorie,
    reorder: true,
    sortable: true,
    grow: 1,
  },
  {
    name: "Surface",
    cell: (row) => (
      <p className="text-sm font-medium">{row.surface + " m²" || "indéfini"}</p>
    ),
    selector: (row) => row.surface || 0,
    sortable: true,
    reorder: true,
    grow: 1,
  },
  {
    name: "Prix",
    cell: (row) => <p className="text-sm font-medium">{row.prix + " DZD"}</p>,
    selector: (row) => row.prix,
    sortable: true,
    reorder: true,
    grow: 1,
  },
  {
    name: "Location",
    cell: (row) => (
      <div className="flex flex-col text-sm font-medium">
        <p>{row.commune}</p>
        <p>{row.wilaya}</p>
      </div>
    ),
    selector: (row) => [row.commune, row.wilaya].join(" "),
    sortable: true,
    reorder: true,
    grow: 1,
  },
  {
    name: "Date de publication",
    cell: (row) => (
      <p className="text-sm font-medium">
        {new Date(row.date_publication).toDateString()}
      </p>
    ),
    selector: (row) => new Date(row.date_publication).toUTCString(),
    sortable: true,
    reorder: true,
    grow: 1.5,
  },
  {
    name: "Actions",
    cell: (row) => {
      const [addingLoading, setAddingLoading] = useState<boolean>(false);
      const router = useRouter();
      const addAnnouncementHandler = async () => {
        setAddingLoading(true);
        try {
          const response =
            await announcementService.createAnnouncementFromScrap(row);
          console.log(response);
          router.push(ROUTES.POSTED_ANNOUNCEMENTS.path);
        } catch (e) {
          console.log(e);
        } finally {
          setAddingLoading(false);
        }
      };
      return (
        <button
          disabled={addingLoading}
          onClick={addAnnouncementHandler}
          className={`${
            addingLoading ? "animate-pulse" : ""
          } flex items-center gap-x-1 rounded-sm  bg-blue-primary px-2  py-1 text-sm font-medium text-white transition duration-200 hover:bg-blue-hover`}
        >
          <ICONS.Check />
          <span className="whitespace-nowrap">Ajouter</span>
        </button>
      );
    },
    grow: 2.5,
  },
];

const ScrapAnnoucenemntIndex = () => {
  const [announcements, setAnnouncements] = useState<
    Announcement.AnnouncementScrap[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getAnnouncements = async () => {
    setLoading(true);
    try {
      const response = await announcementService.scrapAnnouncement();
      setAnnouncements(response.data.annonces);
      console.log(response.data.annonces);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAnnouncements();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="container px-4">
        <div className="flex justify-center py-10">
          <h1 className="relative z-10 text-center font-serif text-3xl font-semibold text-gray-900 after:absolute after:top-full after:left-0 after:h-2 after:w-full after:origin-left after:skew-y-1 after:animate-reveal after:bg-blue-primary">
            Scrap d'annonces
          </h1>
        </div>
        <div className=" bg-white p-2 shadow">
          <DataTable
            columns={columns}
            data={announcements}
            customStyles={{
              headCells: {
                style: {
                  fontWeight: 700,
                  fontFamily: "'Merriweather', sarif",
                },
              },
            }}
            pagination
            progressPending={loading}
            progressComponent={
              <div className="flex h-52 w-full items-center justify-center dark:bg-slate-800">
                <Loading />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ScrapAnnoucenemntIndex;
