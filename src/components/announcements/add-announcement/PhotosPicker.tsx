import dynamic from "next/dynamic";
import React from "react";
import { ImagePickerConf } from "react-image-picker-editor";
import "react-image-picker-editor/dist/index.css";
import { ICONS } from "../../../constants/icons";
const ReactImagePickerEditor = dynamic(
  () => import("react-image-picker-editor"),
  { ssr: false }
);

const config2: ImagePickerConf = {
  borderRadius: "8px",
  language: "en",
  width: "100%",
  height: "8rem",
  objectFit: "cover",
  compressInitial: null,
  hideEditBtn: true,
  hideDownloadBtn: true,
  hideAddBtn: true,
};

type Props = {
  onImageChange: React.Dispatch<React.SetStateAction<(Blob | null)[]>>;
};

const PhotosPicker: React.FC<Props> = ({ onImageChange }) => {
  return (
    <div>
      <label
        htmlFor={"photos"}
        className="flex items-center gap-x-1 text-sm font-medium text-gray-600 "
      >
        <ICONS.Photo />
        <span className="font-serif">Photos :</span>
      </label>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-4 md:justify-start">
        {[0, 1, 2, 3].map((item) => (
          <div
            className="w-full max-w-[12rem] grow"
            key={item}
            id={`photo-picker-${item}`}
          >
            <ReactImagePickerEditor
              config={config2}
              imageChanged={async (newDataUri: any) => {
                const blob = newDataUri
                  ? await (await fetch(newDataUri)).blob()
                  : null;
                onImageChange((prev) => {
                  let newPhotos = [...prev];
                  newPhotos[item] = blob;
                  return newPhotos;
                });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotosPicker;
