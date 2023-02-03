import Link from "next/link";
import { ADMIN_OUTILS } from "../../constants/adminOutils";

const AdminIndex: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="container px-4">
        <div className="flex justify-center py-10">
          <h1 className="relative z-10 text-center font-serif text-3xl font-semibold text-gray-900 after:absolute after:top-full after:left-0 after:h-2 after:w-full after:origin-left after:skew-y-1 after:animate-reveal after:bg-blue-primary">
            Outils d'administration
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 ">
          {ADMIN_OUTILS.map((outil) => (
            <Link
              href={outil.path}
              key={outil.path}
              className="flex cursor-pointer items-center justify-center gap-x-4 border bg-white py-6 px-8 shadow transition duration-200 hover:bg-blue-light active:scale-95"
            >
              <outil.Icon className="text-xl text-blue-primary" />
              <p className="text-base font-semibold text-gray-700">
                {outil.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminIndex;
