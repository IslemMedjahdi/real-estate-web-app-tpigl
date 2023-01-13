import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ICONS } from "../../../constants/icons";
import useMessage from "../../../hooks/useMessages";

type Props = {
  AnnouncementId: number;
};

const ContactForm: React.FC<Props> = ({ AnnouncementId }) => {
  const { sendMessage, isConnected } = useMessage();

  const [message, setMessage] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isConnected) {
      sendMessage(AnnouncementId, message);
      setMessage("");
      toast.success("Le message a été envoyé avec succès", {
        progressClassName: "!bg-blue-primary",
        icon: (
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-primary">
            <ICONS.Check className=" text-white" />
          </div>
        ),
      });
    }
  };

  return (
    <div className="flex flex-col gap-y-4 p-4">
      <p className="relative w-fit font-serif text-lg font-bold after:absolute after:bottom-0 after:left-0  after:h-1 after:w-full after:origin-left after:skew-y-[0.5deg]  after:bg-blue-primary after:transition after:duration-300 hover:after:scale-x-100">
        Contactez nous
      </p>
      <form onSubmit={onSubmit} className="flex flex-col gap-y-2">
        <label className="text-sm font-medium text-gray-800" htmlFor="message">
          Message
        </label>
        <textarea
          rows={5}
          name="message"
          id="message"
          className="w-full rounded-sm border p-4 text-sm text-gray-900 shadow-sm outline-none"
          placeholder="message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <p className="text-xs">
          Vos informations seront transmises au propriétaire de l'annonce.
        </p>
        <button
          type="submit"
          disabled={!isConnected}
          className="rounded-sm bg-blue-primary px-4 py-2 text-sm text-white transition duration-200 hover:bg-blue-hover disabled:bg-blue-hover"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
