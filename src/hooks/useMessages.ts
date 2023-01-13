import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";

const useMessage = () => {
  if (MessageContext) {
    return useContext(MessageContext);
  } else {
    throw new Error("MessageProvider is required");
  }
};

export default useMessage;
