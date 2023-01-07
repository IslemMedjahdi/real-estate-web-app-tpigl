import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Autoplay } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { ICONS } from "../../../constants/icons";
import { ROUTES } from "../../../constants/routes";
import { imageUrl, time_ago } from "../../../utils/lib";

type Props = {
  photos: Commun.Image[];
  title: string;
  price: number;
  localisation: Commun.Localisation;
  category: string;
  createdAt: Date;
  id: number;
};

const AnnouncementCard: React.FC<Props> = ({
  photos,
  title,
  price,
  localisation,
  category,
  createdAt,
  id,
}) => {
  return (
    <Link
      href={ROUTES.ANNOUNCEMENT_BY_ID.path + id}
      className="group  col-span-1 flex w-full cursor-pointer flex-col overflow-hidden rounded border shadow-sm transition duration-200 hover:shadow"
    >
      <div>
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            stopOnLastSlide: false,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
            delay:
              6000 - (photos.length <= 3 ? (photos.length % 3) * 1000 : 3000),
          }}
          loop={true}
          className="!-z-0"
        >
          {photos.map(({ id }) => (
            <SwiperSlide key={id} className="!w-full">
              <div className="overflow-hidden">
                <Image
                  src={imageUrl(id)}
                  alt="thumb"
                  width={720}
                  height={480}
                  className="aspect-video object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex flex-col gap-2 px-2 py-4">
        <p className="font-serif font-bold">{title}</p>
        <div className="flex flex-wrap items-center justify-between">
          <p className="text-sm font-bold text-blue-primary">{price} DZD</p>
          <p className="flex items-center gap-x-1 text-xs font-medium text-gray-700">
            <ICONS.Map />
            <span>
              {localisation.commune}, {localisation.wilaya}
            </span>
          </p>
        </div>
        <div>
          <p className="flex items-center gap-x-1 text-sm font-medium">
            <ICONS.Category className="text-gray-600" />
            <span>{category}</span>
          </p>
          <p className="flex items-center gap-x-1 text-sm font-medium">
            <ICONS.Watch className="text-gray-600" />
            <span>{time_ago(new Date(createdAt))}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default AnnouncementCard;
