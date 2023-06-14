'use client'

import clxs from 'clsx'
import { ChangeEvent } from 'react';
import {
    FieldErrors,
    FieldValues,
    UseFormRegister
} from 'react-hook-form'

interface InputProps {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    disabled?: boolean;
    value?: string;
    getValue?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled,
    value,
    getValue
}) => {
    return (
        <>
        {type === 'radio' ? (
            <label htmlFor={value} className='flex gap-2 items-center cursor-pointer'>
                <input
                    id={value}
                    type={type}
                    disabled={disabled}
                    value={value}
                    {...register(id , { required: "*Campo obrigatório", onChange(e) {
                        if(getValue) {
                            getValue(e)
                        }
                    } })}
                />
                <span
                    className='block text-sm font-medium leading-6 text-gray-900'
                >
                    {label}
                </span>
            </label>
        ) : (
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
                <div className='mt-2'>
                    <input 
                        id={id}
                        type={type}
                        autoComplete={id}
                        disabled={disabled}
                        {...register(id , { required, onChange(e) {
                            if(getValue) {
                                getValue(e)
                            }
                        } })}
                        className={clxs(`
                            form-input
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
                            errors[id] && 'focus:ring-rose-500',
                            disabled && 'opacity-50 cursor-default'
                        )}
                    />
                </div>
            </div>
        )}
        
        </>
    )
}

export default Input;