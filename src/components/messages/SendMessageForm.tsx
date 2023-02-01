import React from "react";
import { ICONS } from "../../constants/icons";
import useMessage from "../../hooks/useMessages";

type Props = {
  announcementId: number;
};

const SendMessageForm: React.FC<Props> = ({ announcementId }) => {
  const { sendMessage } = useMessage();

  const [message, setMessage] = React.useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(announcementId, message);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full justify-between gap-2 bg-white p-2"
    >
      <input
        value={message}
        type={"text"}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        placeholder="Envoyer un message"
        className="grow rounded-xl border-2 border-blue-primary px-4 py-3 text-sm font-medium outline-none"
      />
      <button
        type="submit"
        className="flex items-center gap-2 rounded-xl  bg-blue-primary px-4 py-1 text-sm font-medium text-white transition duration-300 hover:bg-blue-hover"
      >
        <span>Envoyer</span>
        <ICONS.SEND />
      </button>
    </form>
  );
};

export default SendMessageForm;
