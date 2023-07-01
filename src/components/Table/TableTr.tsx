import { HTMLAttributes, ReactNode } from "react";

interface TableTrProps extends HTMLAttributes<HTMLTableRowElement> {
    children: ReactNode;
}

const TableTr: React.FC<TableTrProps> = ({
    children,
    ...props
}) => {
    return (
        <tr
            {...props}
            className="hover:bg-neutral-400/20"
        >
            {children}
        </tr>
    )
}

export default TableTr;