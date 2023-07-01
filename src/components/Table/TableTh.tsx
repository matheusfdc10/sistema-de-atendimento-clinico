import { ReactNode, ThHTMLAttributes } from "react"

interface TableThProps extends ThHTMLAttributes<HTMLTableHeaderCellElement> {
    children: ReactNode;
}

const TableTh: React.FC<TableThProps> = ({
    children,
    ...props
}) => {
    return (
        <th 
            {...props}
            className="px-6 py-3"
        >
            {children}
        </th>
    )
}

export default TableTh;