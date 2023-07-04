'use client'

import clxs from "clsx";
import { InputHTMLAttributes, forwardRef, useEffect, useRef, LegacyRef } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";
import { FormPatient } from "../forms/RegisterPatientForm";
import InputMask from 'react-input-mask';

interface InputTextMaskProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errors?: FieldErrors<FieldValues | FormPatient>;
  disabled?: boolean;
  dateMax?: boolean;
  dateMin?: boolean;
  uppercase?: boolean;
  mask: string;
  maskPlaceholder?: string;
  hidden?: boolean;
}

const InputTextMask: React.FC<InputTextMaskProps> = forwardRef<HTMLInputElement, InputTextMaskProps>(
    (
      { label, errors, disabled, dateMax, dateMin, uppercase, mask, maskPlaceholder, hidden, ...props },
      ref
    ) => {
  
      return (
        <div className={`${hidden && 'hidden'}`}>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            {label}
          </label>
          <div className="mt-2">
            <InputMask
              ref={ref as LegacyRef<InputMask>}
              mask={mask}
              maskChar=""
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
                uppercase ? 'uppercase': '',
                errors ? 'ring-rose-500 ring-2' : 'focus:ring-sky-600',
                disabled ? 'opacity-80 cursor-not-allowed' : 'cursor-text',
              )}
              disabled={disabled}
            />
          </div>
        </div>
      );
    }
  );

InputTextMask.displayName = 'InputTextMask';
  
export default InputTextMask;