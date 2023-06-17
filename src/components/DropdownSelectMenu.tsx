'use client'

import clxs from 'clsx'
import { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { FormPatient } from "./forms/RegisterPatientForm";

interface Option {
    value: string;
    label: string;
}

interface DropdownSelectMenuProps {
    label: string;
    id: string;
    required?: boolean;
    register: UseFormRegister<FieldValues | FormPatient>;
    errors: FieldErrors<FieldValues>;
    disabled?: boolean;
    options: Option[];
    placeholder?: string;
    option: (selected: Option | null) => void;
}

const DropdownSelectMenu: React.FC<DropdownSelectMenuProps> = ({
    id,
    errors,
    label,
    options,
    register,
    disabled,
    required,
    placeholder,
    option
}) => {
    const [inputValue, setInputValue] = useState("");
    const [selected, setSelected] = useState<Option | null>(null);
    const [open, setOpen] = useState(false);
    
    const handleSelectChange = (selected: Option) => {
        option(selected)
    }
  
    return (
      <div className="font-medium">
        <label
            className='
                block
                text-sm
                font-medium
                leading-6
                text-gray-900
            '
            htmlFor={id}
        >
            {label}
        </label>
        <div className='
            mt-2
            relative
            flex
        '>
            <div
            onClick={() => setOpen(!open)}
            className={clxs(`
                cursor-pointer
                outline-none
                block
                w-full
                rounded-md
                border-0
                py-1.5
                px-3
                text-neutral-900
                shadow-sm
                ring-1
                ring-inset
                ring-neutral-300
                placeholder:text-neutral-400
                focus:ring-2
                focus:ring-inset
                sm:text-sm
                sm:leading-6
                bg-white`,
                errors[id] ? 'ring-rose-500 ring-2' : 'focus:ring-sky-600',
                disabled && 'bg-neutral-50 cursor-default'
            )}
            >
            {errors[id] ? (
                "Select Country"
            ) : (
                selected ? (
                    (selected?.label?.length > 25 ? selected?.label?.substring(0, 25) + "..."  : selected?.label)
                ) : (
                    "Select Country"
                )
            )}
            
            {/* <BiChevronDown size={20} className={`${open && "rotate-180"}`} /> */}
            </div>
            <ul
            className={`bg-white mt-9 overflow-y-auto absolute ${
                open ? "max-h-60" : "max-h-0"
            } `}
            >
            <div className="flex items-center px-2 sticky top-0 bg-white">
                {/* <AiOutlineSearch size={18} className="text-gray-700" /> */}
                <input
                    id={id}
                    {...register(id , { required })}
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value.toLowerCase())
                    }}
                    placeholder={placeholder}
                    className="placeholder:text-gray-700 p-2 outline-none"
                />
            </div>
            {options?.map((country) => (
                <li
                key={country.label}
                className={`p-2 text-sm hover:bg-sky-600 hover:text-white
                ${
                    country.label.toLowerCase() === selected?.label.toLowerCase() &&
                    "bg-sky-600 text-white"
                }
                ${
                    country.label.toLowerCase().startsWith(inputValue)
                    ? "block"
                    : "hidden"
                }`}
                onClick={() => {
                    if (country.label.toLowerCase() !== selected?.label.toLowerCase()) {
                        handleSelectChange(country)
                        setSelected(country);
                        setOpen(false);
                        setInputValue("");
                    }
                }}
                >
                {country.label}
                </li>
            ))}
            </ul>
        </div>
      </div>
    );
}

export default DropdownSelectMenu;