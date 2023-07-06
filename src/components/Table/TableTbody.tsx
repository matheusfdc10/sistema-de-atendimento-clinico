import { ReactNode } from "react";

interface TableTbodyProps {
    children: ReactNode;
}

const TableTbody: React.FC<TableTbodyProps> = ( {
    children
}) => {
    return (
        <tbody className="divide-y divide-neutral-400/50 bg-neutral-100 transition-all">
            {children}
        </tbody>
    )
}

export default TableTbody;