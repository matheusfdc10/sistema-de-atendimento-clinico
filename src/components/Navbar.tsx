'use client'

import { signOut } from "next-auth/react";
import Button from "./buttons/Button";
import LiDropdown from "./LiDropdown";

const MenuCadastro = [
    {
        title: "Médico",
        path: "/register/doctor"
    },
    {
        title: "Paciente",
        path: "/register/patient"
    }
]

const MenuAtendimento = [
    {
        title: 'Paciente',
        path: '/consultation/patient'
    }
]

const Navbar = () => {

    return (
        <nav>
            <ul className="flex gap-8 items-center">
                <LiDropdown text="Cadastro:" itemsDropdown={MenuCadastro}/>
                <LiDropdown text="Atendimento:" itemsDropdown={MenuAtendimento}/>
                <li>
                    <Button
                        type="button"
                        onClick={() => signOut()}
                    >
                        sair
                    </Button>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;