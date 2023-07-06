import { ReactNode, TdHTMLAttributes } from "react"

interface TableTdProps extends TdHTMLAttributes<HTMLTableHeaderCellElement> {
    children: ReactNode;
    className?: string;
}

const TableTd: React.FC<TableTdProps> = ({
    children,
    className,
    ...props
}) => {
    return (
        <td 
            {...props}
            className={`px-6 py-3 ${className}`}
        >
            {children}
        </td>
    )
}

export default TableTd;