import React from "react";

type Props = {
  text: string;
};

const Description: React.FC<Props> = ({ text }) => {
  return (
    <div>
      <h1 className="font-serif text-lg font-bold text-gray-900">
        Description:
      </h1>
      <div className="prose prose-sm prose-a:text-blue-primary">
        <div
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />
      </div>
    </div>
  );
};

export default Description;
