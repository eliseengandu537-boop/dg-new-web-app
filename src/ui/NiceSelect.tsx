"use client"
import React, { FC, ChangeEvent } from "react";

interface Option {
  value: string;
  text: string;
}

type NiceSelectProps = {
  options: Option[];
  defaultCurrent: number;
  placeholder: string;
  className?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  name: string;
}

const NiceSelect: FC<NiceSelectProps> = ({
  options,
  defaultCurrent,
  placeholder,
  className,
  onChange,
  name,
}) => {
  const accessibleName = name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/^./, (character) => character.toUpperCase());

  return (
    <select
      className={`nice-select form-select-lg ${className || ""}`}
      defaultValue={options[defaultCurrent]?.value || ""}
      onChange={onChange}
      name={name}
      aria-label={accessibleName || placeholder || "Select an option"}
    >
      {placeholder && !options.some((item) => item.value === "") && <option value="">{placeholder}</option>}
      {options?.map((item, i) => <option key={`${item.value}-${i}`} value={item.value}>{item.text}</option>)}
    </select>
  );
};

export default NiceSelect;
