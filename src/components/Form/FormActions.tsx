import { ReactNode } from "react";

interface FormContainerActionsProps {
    children: ReactNode;
}

const FormContainerActions: React.FC<FormContainerActionsProps> = ({
    children
}) => {
    return (
        <div className="flex justify-end flex-wrap gap-6">
            {children}
        </div>
    )
}

export default FormContainerActions;