import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { ICONS } from "../../constants/icons";

type Props = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  disabled?: boolean;
};
const Select: React.FC<Props> = ({
  options,
  value,
  onChange,
  placeholder,
  disabled,
  error,
}) => {
  return (
    <div className="relative w-full max-w-xs">
      <div className="w-full text-sm">
        <Listbox value={value} onChange={onChange}>
          <div className="relative ">
            <Listbox.Button
              disabled={disabled}
              className={`relative flex w-full items-center justify-between  gap-x-2 rounded border  py-2.5 px-4 ${
                disabled ? "cursor-default bg-gray-50" : "bg-white"
              }`}
            >
              <span
                className={`block truncate ${value ? " " : "text-gray-400"}`}
              >
                {value || placeholder}
              </span>
              <span className="pointer-events-none flex items-center">
                <ICONS.CHEVRON_DOWN
                  className="text-gray-600 "
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            {options.length > 0 && (
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-50 mt-1 max-h-36 w-full overflow-auto border bg-white  ">
                  {options.map((option, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 px-10 text-sm ${
                          active
                            ? "bg-gray-100 text-gray-800 "
                            : "text-gray-600"
                        }`
                      }
                      value={option}
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block `}>
                            {option !== "" ? option : placeholder}
                          </span>
                          {selected ? (
                            <span className="text-primary absolute inset-y-0 left-0 flex items-center pl-2">
                              <ICONS.Check className="" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            )}
          </div>
        </Listbox>
      </div>
      {error && (
        <span className="absolute top-full text-[10px] text-red-500">
          {error}
        </span>
      )}
    </div>
  );
};

export default Select;
