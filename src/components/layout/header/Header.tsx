import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { IMAGES } from "../../../constants/images";
import { INFO } from "../../../constants/info";
import { NAV } from "../../../constants/nav";
import { ROUTES } from "../../../constants/routes";
import useAuth from "../../../hooks/useAuth";
import { useScrollDirection } from "../../../hooks/useScrollDirection";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const scrollDirection = useScrollDirection();

  return (
    <header
      className={`sticky ${
        scrollDirection === "down" ? "-top-24" : "top-0"
      }  z-50 flex justify-center border-b bg-white shadow transition-all duration-500`}
    >
      <div className="container flex items-center justify-between gap-x-4  py-4 px-4">
        <div className="flex items-center gap-x-4">
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
            {NAV.map(({ name, path, allowedRoles }, index) =>
              currentUser && allowedRoles.includes(currentUser.role) ? (
                <Link
                  key={index}
                  id={`route-${path.replace("/", "") || "home"}`}
                  className={`relative text-base font-semibold after:absolute after:top-full after:left-0  after:h-1 after:w-full after:origin-left after:skew-y-1 ${
                    path === router.pathname
                      ? "after:scale-x-100"
                      : "after:scale-x-0"
                  } after:bg-blue-primary after:transition after:duration-300 hover:after:scale-x-100`}
                  href={path}
                >
                  {name}
                </Link>
              ) : null
            )}
          </nav>
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
