import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import { ICONS } from "../../../constants/icons";
import { MENU_NAV } from "../../../constants/menuNav";
import { NAV } from "../../../constants/nav";
import { ROUTES } from "../../../constants/routes";
import useAuth from "../../../hooks/useAuth";

const ProfileMenu = () => {
  const { currentUser, signOut } = useAuth();

  if (!currentUser) {
    return <></>;
  }
  const ProfileImage = () => (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-hover p-1 text-sm font-medium text-white">
      <img
        src={`https://api.dicebear.com/5.x/bottts/svg?seed=${
          currentUser.nom + currentUser.prenom + currentUser.email
        }`}
        alt="avatar"
        className="h-full w-full rounded-full"
      />
    </div>
  );

  return (
    <div className="relative">
      <Menu as="div" className="relative inline-block">
        <Menu.Button className="cursor-pointer">
          <ProfileImage />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-6 min-w-[14rem] origin-top-right divide-y divide-gray-100 rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <Link
                href={ROUTES.HOME.path}
                className="flex items-center gap-x-2 px-2 py-2 text-sm font-medium hover:bg-gray-50 "
              >
                <div>
                  <ProfileImage />
                </div>
                <p className="h-5 overflow-hidden">
                  <span className="capitalize">
                    {currentUser.prenom.toLowerCase()}
                  </span>{" "}
                  <span className="capitalize">
                    {currentUser.nom.toLowerCase()}
                  </span>
                </p>
              </Link>
            </Menu.Item>
            {MENU_NAV.map(({ name, allowedRoles, path, Icon }, index) =>
              currentUser && allowedRoles.includes(currentUser.role) ? (
                <Menu.Item key={index}>
                  <Link
                    className="flex flex-wrap items-center gap-x-2 px-2 py-2 text-sm font-medium  hover:bg-gray-50"
                    href={path}
                  >
                    <div className="flex h-10 w-10 items-center justify-center">
                      <Icon className="text-xl text-gray-700" />
                    </div>
                    <span> {name}</span>
                  </Link>
                </Menu.Item>
              ) : null
            )}
            {NAV.map(({ Icon, allowedRoles, name, path }, index) =>
              currentUser && allowedRoles.includes(currentUser.role) ? (
                <Menu.Item key={index}>
                  <Link
                    className="flex flex-wrap items-center gap-x-2 px-2 py-2 text-sm font-medium hover:bg-gray-50 md:hidden "
                    href={path}
                  >
                    <div className="flex h-10 w-10 items-center justify-center">
                      <Icon className="text-xl text-gray-700" />
                    </div>
                    <span> {name}</span>
                  </Link>
                </Menu.Item>
              ) : null
            )}
            <Menu.Item>
              <div
                onClick={signOut}
                className="flex cursor-pointer flex-wrap items-center gap-x-2 px-2 py-2 text-sm font-medium hover:bg-gray-50"
              >
                <div className="flex h-10 w-10 items-center justify-center">
                  <ICONS.SignOut className="text-xl text-gray-700" />
                </div>
                <p>Se déconnecter</p>
              </div>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
