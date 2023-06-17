'use client'

import clxs from 'clsx'
import { Ref, TextareaHTMLAttributes, forwardRef } from 'react';
import {
    FieldErrors,
    FieldValues,
} from 'react-hook-form'
import { FormPatient } from '../forms/RegisterPatientForm';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    label: string;
    errors?: FieldErrors<FieldValues | FormPatient>;
    disabled?: boolean;
}

const Textarea = forwardRef(
    (
        { label, errors, disabled, ...props }: TextareaProps,
        ref: Ref<HTMLTextAreaElement>
    ) => {
    return (
        <div>
            <label
                className='
                    block
                    text-sm
                    font-medium
                    leading-6
                    text-gray-900
                '
            >
                {label}
            </label>
            <div className='mt-2'>
                <textarea
                    ref={ref}
                    {...props}
                    disabled={disabled}
                    className={clxs(`
                        outline-none
                        min-h-[100px]
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
                        focus:ring-sky-600
                        sm:text-sm
                        sm:leading-6`,
                        errors && 'focus:ring-rose-500',
                        disabled && 'opacity-50 cursor-default'
                    )}
                />
            </div>
        </div>
    )
});

export default Textarea;