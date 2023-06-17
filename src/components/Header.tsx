import Link from "next/link";
import Navbar from "./Navbar";

const Header = () => {
    return (
        <header className="bg-neutral-300 h-20 shadow-lg shadow-neutral-900/30 fixed top-0 w-full z-50">
            <div className="max-w-screen-2xl m-auto py-3 px-4 sm:px-6 flex justify-between items-center h-full">
                <Link href="/">
                    <h1 className="font-black text-4xl">SAC</h1>
                </Link>
                <Navbar />
            </div>
        </header>
    )
}

export default Header;