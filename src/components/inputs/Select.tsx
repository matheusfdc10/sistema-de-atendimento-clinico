'use client'

import clxs from 'clsx'
import {
    FieldErrors,
    FieldValues,
    UseFormRegister
} from 'react-hook-form'
import { FormPatient } from '../forms/RegisterPatientForm';
import { ChangeEvent, useState } from 'react';

interface SelectProps {
    label: string;
    id: string;
    required?: boolean;
    register: UseFormRegister<FieldValues | FormPatient>;
    errors: FieldErrors<FieldValues>;
    disabled?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    options: string[];
}

const Select: React.FC<SelectProps> = ({
    label,
    id,
    required,
    register,
    errors,
    disabled,
    options,
    onChange
}) => {
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
                htmlFor={id}
            >
                {label}
            </label>
            <div className='
                mt-2
                relative
                flex
            '>
                <select 
                    id={id}
                    disabled={disabled}
                    {...register(id , { required , onChange(e) {
                        if(onChange) {
                            onChange(e)
                        }
                    } })}
                    className={clxs(`
                        flex-1
                        appearance-none
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
                    <option
                        value=''
                        disabled
                        className={clxs(`
                            outline-none
                            block
                            w-full
                            rounded-md
                            border-0
                            py-2
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
                        Escolha uma opção
                    </option>
                    {options?.map((option, index) => (
                        <option
                            key={index}
                            value={option}
                            className={clxs(`
                                capitalize
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
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default Select;