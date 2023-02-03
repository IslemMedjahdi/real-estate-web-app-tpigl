import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import AnnouncementService from "../../services/annoucement.service";
import { Announcement } from "../../typings/announcement";
import Loading from "../shared/Loading";
const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });

const announcementService = AnnouncementService.getInstance();

const ScrapAnnoucenemntIndex = () => {
  const [annoucement, setAnnouncement] = useState<Announcement.Announcement[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  const getAnnouncements = async () => {
    setLoading(true);
    try {
      const response = await announcementService.scrapAnnouncement();
      setAnnouncement(response.data);
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
          {loading ? (
            <div className="flex h-96 items-center justify-center">
              <Loading />
            </div>
          ) : (
            <ReactJson src={annoucement} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ScrapAnnoucenemntIndex;
