import Image from "next/image";
import Link from "next/link";
import { ICONS } from "../../../constants/icons";
import { IMAGES } from "../../../constants/images";
import { INFO } from "../../../constants/info";
import { NAV } from "../../../constants/nav";
import { ROUTES } from "../../../constants/routes";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
  return (
    <header className="flex items-center justify-between gap-x-4 border-b py-4 px-4">
      <div className="flex items-center gap-x-4">
        <button className="p-1 hover:bg-gray-50">
          <ICONS.MENU className="text-xl" />
        </button>
        <Link
          href={ROUTES.HOME.path}
          className="flex cursor-pointer flex-wrap items-baseline gap-2"
        >
          <Image src={IMAGES.Logo} alt="logo" width={50} height={50} />
          <h1 className="hidden whitespace-nowrap font-serif text-xl font-bold text-white md:flex md:text-gray-900">
            {INFO.Title}
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-4">
        <nav className="hidden items-center gap-x-4 md:flex ">
          {NAV.map((item, index) => (
            <Link
              key={index}
              className="text-base font-semibold"
              href={item.path}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <ProfileMenu />
      </div>
    </header>
  );
};

export default Header;
