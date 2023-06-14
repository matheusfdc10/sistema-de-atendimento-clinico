'use client'

import clxs from 'clsx'
import {
    FieldErrors,
    FieldValues,
    UseFormRegister
} from 'react-hook-form'

interface TextareaProps {
    label: string;
    id: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    disabled?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
    label,
    id,
    required,
    register,
    errors,
    disabled
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
            <div className='mt-2'>
                <textarea 
                    id={id}
                    autoComplete={id}
                    disabled={disabled}
                    {...register(id , { required, onChange(e) {
                        if(e.target) {
                            e.target.style.height = '100px';
                            e.target.style.height = `${e.target.scrollHeight}px`;
                        }
                    }, })}
                    className={clxs(`
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
                        errors[id] && 'focus:ring-rose-500',
                        disabled && 'opacity-50 cursor-default'
                    )}
                />
            </div>
        </div>
    )
}

export default Textarea;