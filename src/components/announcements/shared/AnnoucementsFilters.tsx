import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { ICONS } from "../../../constants/icons";
import { WILAYAS_FR } from "../../../constants/wilaya_algeria";
import { Announcement } from "../../../typings/announcement";
import Select from "../../shared/Select";

import fr from "date-fns/locale/fr";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Range } from "react-range";
import { getTrackBackground } from "react-range/lib/utils";
import { INFO } from "../../../constants/info";
import LocationService from "../../../services/locations.service";
registerLocale("fr", fr);

type Props = {
  filters: Announcement.AnnouncementFilters;
  onFilterChange: React.Dispatch<
    React.SetStateAction<Announcement.AnnouncementFilters>
  >;
  onSubmit: () => void;
};

const locationService = LocationService.getInstance();

const AnnoucementsFilters: React.FC<Props> = ({
  filters,
  onFilterChange,
  onSubmit,
}) => {
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  const [communes, setCommunes] = useState<string[]>([]);

  const onWilayaChange = async (wilaya: string) => {
    setCommunes([]);
    onFilterChange((prev) => ({ ...prev, commune: undefined }));
    try {
      const response = await locationService.getCommunes(wilaya);
      const communes = response.data.map(({ commune }: any) => commune);
      setCommunes([""].concat(communes));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={onFormSubmit}
        className="flex w-full flex-col items-center justify-center gap-4"
      >
        <div className="flex w-full flex-wrap items-center justify-center gap-2">
          <input
            className="w-full max-w-xs border px-2 py-2.5  text-sm outline-none sm:max-w-xs"
            placeholder="Entrez un mot-clé"
            value={filters.search || ""}
            onChange={(e) =>
              onFilterChange((prev) => ({ ...prev, search: e.target.value }))
            }
          />
          <button className="flex w-full max-w-xs items-center gap-x-2 rounded-sm bg-blue-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-hover sm:w-fit">
            <ICONS.Search />
            <span>Rechercher</span>
          </button>
        </div>
        <p className="text-sm font-medium text-gray-500">
          Paramètres de filtre
        </p>
        <div className="flex w-full flex-wrap items-center justify-center gap-2">
          <Select
            placeholder="Sélectionnez Wilaya"
            options={WILAYAS_FR}
            value={filters.wilaya || ""}
            onChange={(selected) => {
              onWilayaChange(selected);
              onFilterChange((prev) => ({ ...prev, wilaya: selected }));
            }}
          />
          <Select
            placeholder="Sélectionnez Commune"
            options={communes}
            disabled={communes.length === 0}
            value={filters.commune || ""}
            onChange={(selected) =>
              onFilterChange((prev) => ({ ...prev, commune: selected }))
            }
          />
          <Select
            placeholder="Sélectionnez Type"
            options={[
              "",
              "Terrain",
              "Terrain Agricole",
              "Appartement",
              "Maison",
              "Bungalow",
              "Autre",
            ]}
            value={filters.type || ""}
            onChange={(selected) =>
              onFilterChange((prev) => ({ ...prev, type: selected }))
            }
          />
          <div className="flex w-full flex-wrap items-center justify-center gap-2">
            <div className=" z-10 w-full max-w-xs">
              <DatePicker
                className="w-full cursor-pointer border px-4 py-2.5 text-sm text-gray-700 outline-none placeholder:text-sm"
                placeholderText="La date De : "
                selected={filters.createAtStart}
                onChange={(date) =>
                  onFilterChange((prev) => ({
                    ...prev,
                    createAtStart: date || undefined,
                  }))
                }
                dateFormat="yyyy-MM-dd"
                locale="fr"
              />
            </div>

            <div className=" z-10 w-full max-w-xs">
              <DatePicker
                className="w-full cursor-pointer border px-4 py-2.5 text-sm text-gray-700 outline-none placeholder:text-sm"
                placeholderText="La date à : "
                selected={filters.createdAtEnd}
                onChange={(date) =>
                  onFilterChange((prev) => ({
                    ...prev,
                    createdAtEnd: date || undefined,
                  }))
                }
                dateFormat="yyyy-MM-dd"
                locale="fr"
              />
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-md flex-col gap-y-2">
          <div className="flex items-center justify-between">
            <p className="whitespace-nowrap text-sm font-medium text-gray-600">
              {filters.start_price || 0} DZD
            </p>
            <p className="whitespace-nowrap text-sm font-medium text-gray-600">
              {filters.end_price || INFO.MAX_PRICE} DZD
            </p>
          </div>
          <Range
            step={10000}
            min={0}
            max={INFO.MAX_PRICE}
            values={[
              filters.start_price || 0,
              filters.end_price || INFO.MAX_PRICE,
            ]}
            onChange={(values) =>
              onFilterChange((prev) => ({
                ...prev,
                start_price: values[0],
                end_price: values[1],
              }))
            }
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  background: getTrackBackground({
                    values: [
                      filters.start_price || 0,
                      filters.end_price || INFO.MAX_PRICE,
                    ],
                    colors: ["#ccc", "#1C3988", "#ccc"],
                    min: 0,
                    max: INFO.MAX_PRICE,
                  }),
                }}
                className="h-1.5 w-full rounded-full bg-gray-300"
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="h-4 w-4 rounded-full bg-blue-primary focus:outline-none"
              />
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default AnnoucementsFilters;
