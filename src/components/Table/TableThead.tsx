import { ReactNode } from "react";

interface TableTheadProps {
    children: ReactNode;
}

const TableThead: React.FC<TableTheadProps> = ( {
    children
}) => {
    return (
        <thead className="uppercase bg-neutral-400/75">
            {children}
        </thead>
    )
}

export default TableThead;