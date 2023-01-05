import { useState } from "react";

const ContactForm = () => {
  const [message, setMessage] = useState<string>("");

  const sendMessage = async () => {};

  return (
    <div className="flex flex-col gap-y-4 p-4">
      <p className="relative w-fit font-serif text-lg font-bold after:absolute after:bottom-0 after:left-0  after:h-1 after:w-full after:origin-left after:skew-y-[0.5deg]  after:bg-blue-primary after:transition after:duration-300 hover:after:scale-x-100">
        Contactez nous
      </p>
      <div className="flex flex-col gap-y-2">
        <label className="text-sm font-medium text-gray-800" htmlFor="message">
          Message
        </label>
        <textarea
          rows={5}
          name="message"
          id="message"
          className="w-full rounded-sm border p-4 text-sm text-gray-900 shadow-sm outline-none"
          placeholder="message"
        />
        <p className="text-xs">
          Vos informations seront transmises au propriétaire de l'annonce.
        </p>
        <button
          onClick={sendMessage}
          className="rounded-sm bg-blue-primary px-4 py-2 text-sm text-white transition duration-200 hover:bg-blue-hover"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
