'use client'
import { useState } from "react";
import Dropdown from "./Dropdown";

export type MenuItem = {
    title: string;
    path: string;
}

interface LiDropdownProps {
    text: string;
    itemsDropdown: MenuItem[]
}


const LiDropdown: React.FC<LiDropdownProps> = ({
    text,
    itemsDropdown
}) => {
    const [dropdown, setDropdown] = useState(false)

    return (
        <li
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
        >
            <span className="
                flex
                justify-center
                rounded-md
                px-3
                py-2
                text-sm
                font-semibold
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                text-neutral-50
                bg-sky-500
                hover:bg-sky-600
                focus-visible:outline-sky-600
                shadow-sm
                shadow-neutral-500/50
                "
            >
                {text}
            </span>
            {dropdown && <Dropdown data={itemsDropdown} />}
        </li>
    )
}

export default LiDropdown;