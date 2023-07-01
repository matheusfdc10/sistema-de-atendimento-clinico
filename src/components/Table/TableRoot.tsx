import { ReactNode } from "react";

interface TableRootProps {
    children: ReactNode;
}

const TableRoot: React.FC<TableRootProps> = ({
    children
}) => {
    return (
        <div className="overflow-auto rounded-md shadow-md shadow-neutral-500/25">
            <table className="w-full text-left rounded-md overflow-hidden whitespace-nowrap">
                {children}
            </table>
        </div>
    )
}

export default TableRoot;