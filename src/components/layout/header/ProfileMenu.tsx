import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
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
    <div className="rounded-full bg-blue-primary p-2 font-medium text-white">
      {currentUser.firstName[0]} {currentUser.lastName[0]}
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
          <Menu.Items className="absolute  right-0 mt-6 w-56 origin-top-right divide-y divide-gray-100 rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <Link
                href={ROUTES.HOME.path}
                className="flex flex-wrap items-center gap-x-2 px-3 py-2 hover:bg-gray-50 "
              >
                <ProfileImage />
                <p>
                  {currentUser.firstName} {currentUser.lastName}
                </p>
              </Link>
            </Menu.Item>
            {MENU_NAV.map((item) => (
              <Menu.Item>
                <Link
                  className="flex flex-wrap items-center gap-x-2 px-3 py-4 hover:bg-gray-50"
                  href={item.path}
                >
                  {item.name}
                </Link>
              </Menu.Item>
            ))}
            {NAV.map((item) => (
              <Menu.Item>
                <Link
                  className="flex flex-wrap items-center gap-x-2 px-2 py-4 hover:bg-gray-50 md:hidden "
                  href={item.path}
                >
                  {item.name}
                </Link>
              </Menu.Item>
            ))}
            <Menu.Item>
              <div
                onClick={signOut}
                className="flex cursor-pointer flex-wrap items-center gap-x-2 px-2 py-4 hover:bg-gray-50"
              >
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
