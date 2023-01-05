import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ICONS } from "../../constants/icons";
import { IMAGES } from "../../constants/images";
import { ROUTES } from "../../constants/routes";
import AnnouncementService from "../../services/annoucement.service";
import { Announcement } from "../../typings/announcement";
import Loading from "../shared/Loading";
// Import Swiper styles
import "swiper/css";

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
        {true || (row.photos && row.photos.length > 0) ? (
          <>
            <Swiper
              modules={[Autoplay]}
              loop={true}
              autoplay={{
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                delay: index % 2 ? 3000 : 4000,
              }}
            >
              {[
                IMAGES.Auth_background,
                IMAGES.Auth_background_mobile,
                IMAGES.NO_IMAGE,
              ].map((item, index) => (
                <SwiperSlide key={index} className="!w-full">
                  <Image
                    src={item}
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
            className="aspect-video h-36 object-cover"
            width={720}
            height={480}
          />
        )}
      </>
    ),
    grow: 3,
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
      <p className="text-sm font-medium">
        {row.surface + " Km²" || "indéfini"}
      </p>
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
    name: "Type",
    cell: (row) => (
      <p className="text-sm font-medium">{row.type || "indéfini"}</p>
    ),
    selector: (row) => row.type || "indéfini",
    sortable: true,
    reorder: true,
    grow: 1,
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

  const getMyAnnouncements = async () => {
    setLoading(true);
    try {
      const response = await announcementService.getMyAnnouncements();
      setAnnouncements(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyAnnouncements();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="container max-w-screen-lg px-4">
        <div className="flex justify-center py-10">
          <h1 className="relative z-10 text-center font-serif text-3xl font-semibold after:absolute after:top-full after:left-0 after:h-2 after:w-full after:origin-left after:skew-y-1 after:animate-reveal after:bg-blue-primary">
            Vos announces déposées
          </h1>
        </div>
        <div className="shadow">
          <DataTable
            columns={columns}
            data={announcements || []}
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
              <div className="flex w-full justify-center dark:bg-slate-800">
                <Loading />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PostedAnnouncementIndex;
