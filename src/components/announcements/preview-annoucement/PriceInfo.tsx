import React from "react";

type Props = {
  price: number;
  showSendMessage?: boolean;
};

const PriceInfo: React.FC<Props> = ({ price, showSendMessage = true }) => {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-2 rounded-sm bg-blue-light p-4">
      <div className="flex flex-col">
        <p className="font-medium text-gray-900">Prix à partir de</p>
        <p className="font-serif text-lg font-bold text-gray-900">
          {price} DZD
        </p>
      </div>
      {showSendMessage && (
        <div>
          <button
            onClick={() => document.getElementById("message")?.focus()}
            className="rounded-sm bg-blue-primary px-3 py-1.5 text-sm text-white transition duration-200 hover:bg-blue-hover"
          >
            Envoyer un Message
          </button>
        </div>
      )}
    </div>
  );
};

export default PriceInfo;
