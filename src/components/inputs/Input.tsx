"use client";

import clxs from "clsx";
import { InputHTMLAttributes, Ref, forwardRef } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";
import { FormPatient } from "../forms/RegisterPatientForm";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errors?: FieldErrors<FieldValues | FormPatient>;
  disabled?: boolean;
}

const Input = forwardRef(
  (
    { label, errors, disabled, ...props }: InputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <div>
        <label
          className="
                    block
                    text-sm
                    font-medium
                    leading-6
                    text-gray-900
                "
        >
          {label}
        </label>
        <div className="mt-2">
          <input
            ref={ref}
            disabled={disabled}
            {...props}
            className={clxs(
              `
                        outline-none
                        block
                        w-full
                        rounded-md
                        border-0
                        py-1.5
                        px-3
                        text-neutral-900
                        shadow-sm
                        shadow-neutral-500/50
                        ring-1
                        ring-inset
                        ring-neutral-300
                        placeholder:text-neutral-400
                        focus:ring-2
                        focus:ring-inset
                        sm:text-sm
                        sm:leading-6
                        bg-white`,
              errors ? "ring-rose-500 ring-2" : "focus:ring-sky-600",
              disabled && "bg-neutral-50 cursor-default"
            )}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input'

export default Input;
