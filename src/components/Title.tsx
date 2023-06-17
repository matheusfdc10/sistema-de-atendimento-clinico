interface TitleProps {
    title: string;
}

const Title: React.FC<TitleProps> = ({
    title
}) => {
    return (
        <div className="relative">
            <div
                className="
                    absolute
                    inset-0
                    flex
                    items-center
                "
            >
                <div className="w-full border-t-2 border-neutral-400/60" />
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="font-semibold text-3xl bg-neutral-200 px-4">
                    {title}
                </span>
            </div>
        </div>
    )
}

export default Title;