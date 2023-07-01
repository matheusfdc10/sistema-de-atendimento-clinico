import { FormEvent, ReactNode } from "react";

interface FormRootProps {
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    children: ReactNode;
}

const FormRoot: React.FC<FormRootProps> = ({
    onSubmit,
    children
}) => {
    return (
        <form 
            onSubmit={onSubmit}
            className="flex-1 flex flex-col justify-between gap-6"
        >
            {children}
        </form>
    )
}

export default FormRoot;