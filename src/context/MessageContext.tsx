import React, { createContext, useEffect, useMemo, useState } from "react";

import io, { Socket } from "socket.io-client";
import useAuth from "../hooks/useAuth";
import TokenService from "../services/token.service";

const tokenService = TokenService.getInstance();

export const MessageContext = createContext<{
  isConnected: boolean;
  sendMessage: (announcement_id: number, contenu: string) => void;
}>({
  isConnected: false,
  sendMessage: () => {},
});

let socket: Socket<any>;

const MessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { currentUser } = useAuth();

  const [isConnected, setIsConnected] = useState<boolean>(false);

  const sendMessage = (announcement_id: number, contenu: string) => {
    socket.send({
      data: {
        announcement_id: announcement_id.toString(),
        objet: "",
        contenu,
      },
      headers: {
        Authorization: "Bearer " + tokenService.getAccessToken(),
      },
    });
  };

  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_BACKEND_URL as string, {
      extraHeaders: {
        Authorization: "Bearer " + tokenService.getAccessToken(),
      },
    });

    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Hello world");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("message", (data: any) => {
      console.log(data);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
    };
  }, []);

  const contextValue = useMemo(
    () => ({ isConnected, sendMessage }),
    [isConnected, sendMessage]
  );

  return currentUser ? (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  ) : (
    <>{children}</>
  );
};

export default MessageProvider;
