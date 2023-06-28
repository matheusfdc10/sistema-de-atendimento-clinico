'use client'

import { signOut } from "next-auth/react";
import Button from "./buttons/Button";
import LiDropdown from "./LiDropdown";

const MenuCadastro = [
    {
        title: "Médico",
        path: "/doctor/register"
    },
    {
        title: "Paciente",
        path: "/patient/register"
    }
]

const MenuAtendimento = [
    {
        title: 'Novo',
        path: '/consultation/register'
    }
]

const Menuconsultas = [
    {
        title: 'Pacientes',
        path: '/patient'
    },
    {
        title: 'Médicos',
        path: '/doctor'
    },
    {
        title: 'Atendimentos',
        path: '/consultation'
    },
]

const Navbar = () => {

    return (
        <nav>
            <ul className="flex gap-8 items-center">
                <LiDropdown text="Consultar:" itemsDropdown={Menuconsultas}/>
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