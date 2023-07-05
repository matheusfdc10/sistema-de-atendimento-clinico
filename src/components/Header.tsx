'use client'
import Link from "next/link";
import Navbar from "./Navbar";
import { UserRole } from "@prisma/client";
import Button from "./buttons/Button";
import { signOut } from "next-auth/react";

interface HeaderProps {
    role: UserRole | undefined
}

const Header: React.FC<HeaderProps> = ({
    role
}) => {

    return (
        <header className="bg-neutral-300 h-20 shadow-lg shadow-neutral-900/30 fixed top-0 w-full z-50">
            <div className="max-w-screen-2xl m-auto py-3 px-4 sm:px-6 flex justify-between items-center h-full">
                <Link href="/">
                    <h1 className="font-black text-4xl">SAC</h1>
                </Link>
                {role === 'ADMIN' && (
                    <Navbar />
                )}
                {/* {role === 'DOCTOR' && (
                    <></>
                )} */}
                <Button
                    type="button"
                    onClick={() => signOut()}
                >
                    sair
                </Button>
            </div>
        </header>
    )
}

export default Header;