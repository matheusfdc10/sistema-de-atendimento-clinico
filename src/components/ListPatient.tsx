'use client'
import { useState } from "react";
import Button from "./buttons/Button";
import Input from "./inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Patient } from "@prisma/client";
import { useRouter } from "next/navigation";

const ListPatient = () => {
    const route = useRouter()
    const [patients, setPatients] = useState<Patient[] | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            identity: '',
            // birthDate: '',
            // gender: '',
            phone: '',
            email: '',
            healthInsuranceNumber: '',
            nextConsultation: '',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('/api/patient/search', data)
        .then((response) => setPatients(response.data))
        .catch(() => toast.error('Algo deu errado!'))
        .finally(() => setIsLoading(false))
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={`
                    flex-1
                    flex
                    flex-col
                    justify-between 
                    gap-16
                `}
            >
                <div className="
                    grid 
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                    2xl:grid-cols-5
                    gap-6
                ">
                    <Input
                        label="Nome"
                        disabled={isLoading}
                        {...register("name" , { required: false })}
                        errors={errors.name}
                    />
                    <Input
                        type="number"
                        label="CPF"
                        disabled={isLoading}
                        {...register("identity" , { required: false })}
                        errors={errors.identity}
                    />
                    <Input
                        type="number"
                        label="Número do plano"
                        disabled={isLoading}
                        {...register("healthInsuranceNumber" , { required: false })}
                        errors={errors.healthInsuranceNumber}
                    />
                    <Input
                        type="email"
                        label="E-mail"
                        disabled={isLoading}
                        {...register("email" , { required: false })}
                        errors={errors.email}
                    />
                    <Input
                        type="number"
                        label="Telefone"
                        disabled={isLoading}
                        {...register("phone" , { required: false })}
                        errors={errors.phone}
                    />
                    <Input
                        type="datetime-local"
                        label="Próxima consulta"
                        dateMin
                        disabled={isLoading}
                        {...register("nextConsultation" , { required: false })}
                        errors={errors.nextConsultation}
                    />
                </div>
                <div className="self-end">
                    <Button
                        disabled={isLoading}
                        type="submit"
                    >
                        Buscar
                    </Button>
                </div>
                {/* <div className="w-full border-t-2 border-neutral-400/60" /> */}
            </form>
            {(patients && patients?.length) && (
                <div className="mt-6 overflow-auto rounded-md border border-neutral-400">
                    <table className="w-full text-left">
                        <thead className="uppercase bg-neutral-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Nome</th>
                                <th scope="col" className="px-6 py-3">CPF</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-400/40 transition-all">
                            {patients?.map((patient) => (
                                <tr 
                                    key={patient.id}
                                    onClick={() => route.push(`/patient/${patient.id}`)}
                                    className="cursor-pointer hover:bg-neutral-400/20"
                                >
                                    <td scope="col" className="px-6 py-3">{patient.name}</td>
                                    <td scope="col" className="px-6 py-3">{patient.identity}</td>
                                    <td scope="col" className="px-6 py-3">{patient.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}

export default ListPatient;