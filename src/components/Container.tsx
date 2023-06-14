interface ContainerProps {
    children: React.ReactNode;
    title: string
}

const Container: React.FC<ContainerProps> = ({children, title}) => {
    return (
        <div className="max-w-screen-2xl mx-auto min-h-screen md:px-10 px-4 pt-28 pb-9 flex flex-col">
            <h1 className='text-center font-bold text-3xl capitalize mb-8'>
                {title}
            </h1>
            <div className="flex flex-col flex-1 bg-neutral-200 py-5 px-6 rounded-2xl drop-shadow-[0_0_8px_rgba(23,23,23,0.40)]">
                {children}
            </div>
        </div>
    )
}

export default Container;