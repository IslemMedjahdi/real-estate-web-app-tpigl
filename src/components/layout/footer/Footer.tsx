import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ICONS } from "../../../constants/icons";
import { IMAGES } from "../../../constants/images";
import { INFO } from "../../../constants/info";
import { ROUTES } from "../../../constants/routes";

const Footer: React.FC = () => {
  return (
    <div className="mt-20 flex w-full justify-center bg-blue-dark">
      <div className="container grid grid-cols-1 gap-x-4 gap-y-8 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-y-4">
          <div className="flex h-16 items-center gap-x-4 text-white">
            <Link
              href={ROUTES.HOME.path}
              className="flex cursor-pointer flex-wrap items-baseline gap-2"
            >
              <Image
                src={IMAGES.Logo}
                alt="logo"
                width={50}
                height={50}
                className="brightness-0 invert"
              />
              <h1 className="hidden whitespace-nowrap font-serif text-xl font-bold text-white md:flex">
                {INFO.Title}
              </h1>
            </Link>
          </div>
          <div className="flex gap-x-4">
            <ICONS.LOCATION className="text-2xl text-white" />
            <p className="text-sm text-white">{INFO.adress}</p>
          </div>
          <div className="flex gap-x-4">
            <ICONS.EMAIL className="text-lg text-white" />
            <a href={`mailto:${INFO.email}`} className="text-sm text-white">
              {INFO.email}
            </a>
          </div>
          <div className="flex gap-x-4">
            <ICONS.PHONE className="text-lg text-white" />
            <a href={`tel:${INFO.phone_number}`} className="text-sm text-white">
              {INFO.phone_number}
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center md:h-16">
            <p className="font-medium text-white">Useful Links</p>
          </div>
          <div className="flex flex-col gap-y-4">
            <a
              href="#"
              className="relative w-fit text-sm text-white after:absolute after:left-0 after:top-full after:h-0.5 after:w-full after:scale-x-0 after:bg-white after:transition hover:after:scale-x-100"
            >
              Career
            </a>
            <a
              className="relative w-fit text-sm text-white after:absolute after:left-0 after:top-full after:h-0.5 after:w-full after:scale-x-0 after:bg-white after:transition hover:after:scale-x-100"
              href="#"
            >
              Terms & Conditions
            </a>
            <a
              href="#contact-us"
              className="relative w-fit text-sm text-white after:absolute after:left-0 after:top-full after:h-0.5 after:w-full after:scale-x-0 after:bg-white after:transition hover:after:scale-x-100"
            >
              Contact Us
            </a>
            <a
              href="#"
              className="relative w-fit text-sm text-white after:absolute after:left-0 after:top-full after:h-0.5 after:w-full after:scale-x-0 after:bg-white after:transition hover:after:scale-x-100"
            >
              CITC Regulations
            </a>
            <a
              href="#"
              className="relative w-fit text-sm text-white after:absolute after:left-0 after:top-full after:h-0.5 after:w-full after:scale-x-0 after:bg-white after:transition hover:after:scale-x-100"
            >
              Yalidine APIs
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-y-4">
          <div className="flex items-center md:h-16">
            <p className="text-white">Follow us</p>
          </div>
          <div className="flex items-center gap-4 text-2xl text-white">
            <a
              href={INFO.social_media_links.facebook}
              target={"_blank"}
              rel="noreferrer"
            >
              <ICONS.FACEBOOK />
            </a>
            <a
              href={INFO.social_media_links.instagram}
              target={"_blank"}
              rel="noreferrer"
            >
              <ICONS.INSTAGRAM />
            </a>
            <a
              href={INFO.social_media_links.youtube}
              target={"_blank"}
              rel="noreferrer"
            >
              <ICONS.YOUTUBE />
            </a>
            <a
              href={INFO.social_media_links.linkedin}
              target={"_blank"}
              rel="noreferrer"
            >
              <ICONS.LINKEDIN />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
