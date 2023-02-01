import Link from "next/link";

type Props = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
};

const PosterInfo: React.FC<Props> = ({ email, firstName, lastName, phone }) => {
  return (
    <div className="flex flex-col gap-y-4 p-4">
      <p className="relative w-fit font-serif text-lg font-bold after:absolute after:bottom-0 after:left-0  after:h-1 after:w-full after:origin-left after:skew-y-[0.5deg]  after:bg-blue-primary after:transition after:duration-300 hover:after:scale-x-100">
        Annonceur Info
      </p>
      <div className="flex flex-col items-center gap-y-2">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-hover p-1">
          <img
            src={`https://api.dicebear.com/5.x/bottts/svg?seed=${
              firstName + lastName + email
            }`}
            alt="avatar"
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-center font-serif font-bold ">
            <span className="capitalize"> {firstName.toLowerCase()} </span>
            <span className="capitalize">{lastName.toLowerCase()}</span>
          </p>
          <a
            href={`mailto:${email}`}
            className="text-sm font-medium hover:underline"
          >
            {email}
          </a>
          {phone && (
            <a
              href={`tel:${phone}`}
              className="text-sm font-medium hover:underline"
            >
              {phone}
            </a>
          )}
        </div>
        <Link
          href={"#"}
          className="rounded-sm bg-blue-primary px-4 py-2 text-sm text-white transition duration-200 hover:bg-blue-hover"
        >
          Voir le profil
        </Link>
      </div>
    </div>
  );
};

export default PosterInfo;
