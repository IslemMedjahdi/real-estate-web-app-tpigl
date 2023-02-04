import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ICONS } from "../../../constants/icons";
import { IMAGES } from "../../../constants/images";
import { ROUTES } from "../../../constants/routes";
import AnnouncementService from "../../../services/annoucement.service";
import { Announcement } from "../../../typings/announcement";
import Loading from "../../shared/Loading";
// Import Swiper styles
import "swiper/css";
import { imageUrl } from "../../../utils/lib";

const announcementService = AnnouncementService.getInstance();

const columns: TableColumn<Announcement.AnnouncementPart>[] = [
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
              {row.photos.map(({ id }, index) => (
                <SwiperSlide key={index} className="!w-full overflow-hidden">
                  <Image
                    src={imageUrl(id)}
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
        <p>{row.localisation.commune}</p>
        <p>{row.localisation.wilaya}</p>
      </div>
    ),
    selector: (row) =>
      [row.localisation.commune, row.localisation.wilaya].join(" "),
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
      const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

      const deleteAnnounceHandler = async () => {
        try {
          const response = await announcementService.deleteAnnouncement(row.id);
          window.location.reload();
        } catch (e) {
          console.log(e);
        } finally {
          setDeleteLoading(false);
        }
      };

      return (
        <div className="flex flex-wrap gap-2">
          <button
            disabled={deleteLoading}
            onClick={deleteAnnounceHandler}
            className={`${
              deleteLoading ? "animate-pulse" : ""
            } flex items-center gap-x-1 rounded-sm bg-red-500 px-2  py-1 text-sm font-medium text-white transition duration-200 hover:bg-red-400`}
          >
            <ICONS.Delete />
            <span className="whitespace-nowrap">Supprimer</span>
          </button>
          <Link
            href={ROUTES.ANNOUNCEMENT_BY_ID.path + row.id}
            className="flex items-center gap-x-1 rounded-sm bg-blue-primary px-2 py-1 text-sm font-medium text-white transition duration-200 hover:bg-blue-hover"
          >
            <ICONS.Eye />
            <span className="whitespace-nowrap">Aperçu</span>
          </Link>
        </div>
      );
    },
    grow: 2.5,
  },
];

const PostedAnnouncementIndex: React.FC = () => {
  const [announcements, setAnnouncements] = useState<
    Announcement.AnnouncementPart[] | null
  >(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [searchText, setSearchText] = useState<string>("");

  const getMyAnnouncements = async () => {
    setLoading(true);
    try {
      const response = await announcementService.getMyAnnouncements();
      setAnnouncements(response.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const filteredAnnouncements = useCallback(() => {
    let newAnnouncements: Announcement.AnnouncementPart[] = [];
    if (announcements) {
      newAnnouncements = announcements.filter(
        ({ titre, adresse, categorie, localisation }) =>
          titre.toLowerCase().includes(searchText) ||
          searchText.toLowerCase().includes(titre) ||
          adresse.toLowerCase().includes(searchText) ||
          searchText.toLowerCase().includes(adresse) ||
          categorie.toLowerCase().includes(searchText) ||
          searchText.toLowerCase().includes(categorie) ||
          localisation.wilaya.toLowerCase().includes(searchText) ||
          searchText.toLowerCase().includes(localisation.wilaya) ||
          localisation.commune.toLowerCase().includes(searchText) ||
          searchText.toLowerCase().includes(localisation.commune)
      );
    }
    return newAnnouncements;
  }, [searchText, announcements]);

  useEffect(() => {
    getMyAnnouncements();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="container px-4">
        <div className="flex justify-center py-10">
          <h1 className="relative z-10 text-center font-serif text-3xl font-semibold text-gray-900 after:absolute after:top-full after:left-0 after:h-2 after:w-full after:origin-left after:skew-y-1 after:animate-reveal after:bg-blue-primary">
            Vos announces déposées
          </h1>
        </div>
        <div className="flex w-full flex-col divide-y bg-white shadow">
          <div className="flex w-full flex-wrap-reverse items-center justify-between gap-4 p-4">
            <input
              name="search"
              className="w-full border bg-white px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-primary sm:max-w-xs"
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Recherche"
              value={searchText}
              type="text"
            />
            <div className="flex w-full justify-center sm:w-fit sm:justify-start">
              <Link
                href={ROUTES.ADD_ANNOUNCEMENT.path}
                id={`route-${ROUTES.ADD_ANNOUNCEMENT.path.replace("/", "")}`}
                className="rounded-sm bg-blue-primary px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-blue-hover"
              >
                Ajouter une announce
              </Link>
            </div>
          </div>
          <div id="announcements-table">
            <DataTable
              columns={columns}
              data={filteredAnnouncements()}
              noDataComponent={
                <div className="flex h-52 flex-col items-center justify-center gap-2">
                  <p className="text-center text-lg font-medium text-gray-800">
                    {announcements?.length === 0
                      ? "Vous n'avez pas encore d'annonce, cliquez ici pour ajouter une nouvelle annonce"
                      : `il n'y a pas d'annonce avec la recherche "${searchText}"`}
                  </p>
                  <Link
                    href={ROUTES.ADD_ANNOUNCEMENT.path}
                    className="rounded-sm bg-blue-primary px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-blue-hover"
                  >
                    Ajouter une announce
                  </Link>
                </div>
              }
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
    </div>
  );
};

export default PostedAnnouncementIndex;
