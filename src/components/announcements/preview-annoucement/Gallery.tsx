import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import Image from "next/image";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { imageUrl } from "../../../utils/lib";

type Props = {
  photos: Commun.Image[];
};

const Gallery: React.FC<Props> = ({ photos }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="p-4">
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {photos.map(({ id }) => (
          <SwiperSlide key={id} className="!shadow">
            <Image
              src={imageUrl(id)}
              alt={`thumb-${id}`}
              height={1920}
              width={1080}
              className="aspect-video w-full rounded-sm bg-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex w-full justify-center">
        <div className="w-full  max-w-screen-sm">
          <Swiper
            className="mt-4 "
            onSwiper={(swiper) => setThumbsSwiper(swiper || null)}
            spaceBetween={20}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            {photos.map(({ id }) => (
              <SwiperSlide key={id}>
                <Image
                  src={imageUrl(id)}
                  alt={`thumb-${id}`}
                  height={720}
                  width={480}
                  className="aspect-video w-full cursor-pointer rounded-md  bg-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
