'use client'

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { MenuItem } from "./LiDropdown";

interface DropdownProps {
    data: MenuItem[]
}

const Dropdown: React.FC<DropdownProps> = ({
    data
}) => {
    const [click, setClick] = useState(false)

    const handleClick = () => setClick(!click)

    return (
        <div className="absolute h-auto pt-[1.35rem]">
            <ul
                onClick={handleClick}
                className={clsx('rounded-b-md overflow-hidden transition-all shadow-md shadow-neutral-500/50',
                    click && 'hidden')
                }
            >
                {data.map((item, index) => (
                    <Link
                        key={index}
                        href={item.path} 
                        onClick={() => setClick(false)}
                        className="text-neutral-50 font-semibold w-full flex flex-col bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600 px-3 py-2"
                    >
                        {item.title}
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default Dropdown;