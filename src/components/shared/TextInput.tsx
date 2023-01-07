import React from "react";
import { IconType } from "react-icons";
type Props = {
  value: string;
  label?: string;
  name: string;
  type: "text" | "email" | "tel";
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  Icon?: IconType;
};

const TextInput: React.FC<Props> = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  required,
  error,
  Icon,
}) => {
  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={label}
          className="flex items-center gap-x-1 text-sm font-medium text-gray-600  "
        >
          <span>{label}</span>
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div
        className={`relative mt-2  focus-within:bg-gray-50 ${
          value.length > 0 ? "bg-white" : "bg-gray-50"
        } `}
      >
        <input
          required={required}
          onChange={onChange}
          id={label}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          className="w-full rounded border bg-transparent py-2.5 px-4 text-sm text-gray-900 outline-0  focus:border-gray-400 "
        />
        {Icon && (
          <Icon
            className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 focus-within:bg-gray-50 ${
              value.length > 0 ? "bg-white" : "bg-gray-50"
            } `}
          />
        )}
      </div>
      {error && (
        <span className="absolute top-full text-[10px] text-red-500">
          {error}
        </span>
      )}
    </div>
  );
};

export default TextInput;
