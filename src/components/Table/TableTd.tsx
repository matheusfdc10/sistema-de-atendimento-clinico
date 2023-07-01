import { ReactNode, TdHTMLAttributes } from "react"

interface TableTdProps extends TdHTMLAttributes<HTMLTableHeaderCellElement> {
    children: ReactNode;
}

const TableTd: React.FC<TableTdProps> = ({
    children,
    ...props
}) => {
    return (
        <td 
            {...props}
            className="px-6 py-3"
        >
            {children}
        </td>
    )
}

export default TableTd;