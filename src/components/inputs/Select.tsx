'use client'

import clxs from 'clsx'
import {
    FieldErrors,
    FieldValues,
} from 'react-hook-form'
import React, { forwardRef, SelectHTMLAttributes, Ref } from 'react';
import { FormPatient } from '../forms/RegisterPatientForm';

export interface Option {
    value?: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    errors?: FieldErrors<FieldValues | FormPatient>;
    disabled?: boolean;
    options: Option[];
    capitalize?: boolean;
}

const Select = forwardRef(
({ 
    label,
    errors,
    disabled,
    options,
    capitalize,
    children,
    ...props 
}: SelectProps, ref: Ref<HTMLSelectElement>) => {
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
            <div className='
                mt-2
                relative
                flex
            '>
                <select 
                    ref={ref} 
                    {...props}
                    disabled={disabled}
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
                        errors ? 'ring-rose-500 ring-2' : 'focus:ring-sky-600',
                        disabled && 'bg-neutral-50 cursor-default'
                    )}
                >
                    <option
                        value=''
                        disabled
                    >
                        Escolha uma opção
                    </option>
                    {options.map((option, index) => (
                        <option
                            key={index}
                            value={option.value || option.label}
                            className={capitalize ? 'capitalize' : ''}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
  }
);

export default Select;




































// 'use client'
// import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
// import Select, {SingleValue} from 'react-select';
// import { FormPatient } from './forms/RegisterPatientForm';
// import clxs from 'clsx'

// interface Option {
//     value: string;
//     label: string;
// }

// interface SelectProps {label: string;
//     id: string;
//     required?: boolean;
//     register: UseFormRegister<FieldValues | FormPatient>;
//     errors: FieldErrors<FieldValues>;
//     disabled?: boolean;
//     options: Option[];
//     option: (selected: SingleValue<Option>) => void
// }

// const DropdownSelectMenu: React.FC<SelectProps> = ({
//     options,
//     errors,
//     id,
//     label,
//     register,
//     disabled,
//     required,
//     option
// }) => {

//     const handleSelectChange = (selected :SingleValue<Option>) => {
//         option(selected)
//     }

//   return (
//     <div>
//         <label
//             className='
//                 block
//                 text-sm
//                 font-medium
//                 leading-6
//                 text-gray-900
//                 mb-2
//             '
//             htmlFor={id}
//         >
//             {label}
//         </label>
//             <Select
//                 id={id}
//                 isDisabled={disabled}
//                 options={options}
//                 defaultValue={{ label: 'Selecione uma opção', value: 'empty'}}
//                 {...register(id , { required })}
//                 onChange={ handleSelectChange }
//                 noOptionsMessage={() => "Não encontrado"}
//                 // className={clxs(`
//                 //         flex-1
//                 //         appearance-none
//                 //         cursor-pointer
//                 //         outline-none
//                 //         block
//                 //         w-full
//                 //         rounded-md
//                 //         border-0
//                 //         text-neutral-900
//                 //         shadow-sm
//                 //         ring-1
//                 //         ring-inset
//                 //         ring-neutral-300
//                 //         placeholder:text-neutral-400
//                 //         focus:ring-2
//                 //         focus:ring-inset
//                 //         sm:text-sm
//                 //         sm:leading-6
//                 //         bg-white`,
//                 //         errors[id] ? 'ring-rose-500 ring-2' : 'focus:ring-sky-600',
//                 //         disabled && 'bg-neutral-50 cursor-default'
//                 //     )}

                    
//                     styles={{
//                         control: (baseStyle) => ({
//                             ...baseStyle,
//                             borderColor: errors[id] ? 'red' : 'blue',
//                             borderWidth: 2
//                         }),

//                     }}
//             />
//     </div>
//   );
// };

// export default DropdownSelectMenu;
