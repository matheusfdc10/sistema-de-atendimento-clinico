'use client'

import clxs from "clsx";
import { InputHTMLAttributes, forwardRef, useEffect, useRef } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";
import { FormPatient } from "../forms/RegisterPatientForm";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errors?: FieldErrors<FieldValues | FormPatient>;
  disabled?: boolean;
  dateMax?: boolean;
  dateMin?: boolean;
  hidden?: boolean;
  lowercase?: boolean;
  uppercase?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, errors, disabled, dateMax, dateMin, hidden, lowercase, uppercase, ...props },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      const currentDate = new Date().toISOString().split("T")[0];
      if (inputRef.current) {
        if (props.type === "date") {
          if (dateMax) {
            inputRef.current.max = currentDate;
          } else if (dateMin) {
            inputRef.current.min = currentDate;
          }
        } else if (props.type === "datetime-local") {
          if (dateMax) {
            inputRef.current.max = currentDate + "T23:59";
          } else if (dateMin) {
            inputRef.current.min = currentDate + "T00:00";
          }
        }
      }
    }, [dateMax, dateMin, props.type]);

    useEffect(() => {
      if (ref && inputRef.current) {
        if (typeof ref === "function") {
          ref(inputRef.current);
        } else {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = inputRef.current;
        }
      }
    }, [ref]);

    return (
      <div className={`${hidden && 'hidden'}`}>
        <label className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
        <div className="mt-2">
          <input
            ref={inputRef}
            {...props}
            className={clxs(`
              flex-1
              appearance-none
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
              errors ? 'ring-rose-500 ring-2' : 'focus:ring-sky-600',
              disabled ? 'opacity-80 cursor-not-allowed' : 'cursor-text',
              lowercase && 'lowercase',
              uppercase && 'uppercase',
            )}
            disabled={disabled}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
