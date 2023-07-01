'use client'
import { useState } from "react";
import Button from "./buttons/Button";
import Input from "./inputs/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Patient } from "@prisma/client";
import { useRouter } from "next/navigation";
import  Form  from "./Form";
import { FormPatient } from "./forms/RegisterPatientForm";
import { handleCPFMask, handlePhoneMask } from "@/utils/masks";
import InputTextMask from "./inputs/InputTextMask";

const ListPatient = () => {
    const route = useRouter()
    const [patients, setPatients] = useState<Patient[] | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: {
            errors,
        }
    } = useForm<FormPatient>({
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

    const onSubmit: SubmitHandler<FormPatient> = (data) => {
        const formattedData: FormPatient = {
            ...data,
            identity: data.identity?.replace(/\D/g, ''),
            phone: data.phone?.replace(/\D/g, ''),
        }

        setIsLoading(true)
        axios.post('/api/patient/search', formattedData)
        .then((response) => {
            setPatients(response.data)
            !response.data?.length && toast.error('Nenhum paciente encontrado')
        })
        .catch(() => toast.error('Algo deu errado!'))
        .finally(() => setIsLoading(false))
    }

    return (
        <>
            <Form.Root onSubmit={handleSubmit(onSubmit)}>
                <Form.Container>
                    <Input
                        label="Nome"
                        disabled={isLoading}
                        {...register("name" , { required: false , minLength: 3})}
                        errors={errors.name}
                    />
                    <Input
                        label="CPF"
                        disabled={isLoading}
                        {...register("identity", {
                            required: false,
                            maxLength: 14,
                            minLength: 14,
                        })}
                        onChange={(e) => setValue('identity', handleCPFMask(e.target.value))}
                        errors={errors.identity}
                    />
                    <InputTextMask
                        label="Número do plano"
                        mask="9999999999999999999999999999999"
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
                        label="Telefone"
                        disabled={isLoading}
                        {...register("phone" , {
                            required: false,
                            maxLength: 15,
                            minLength: 15
                        })}
                        onChange={(e) => setValue('phone', handlePhoneMask(e.target.value))}
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
                </Form.Container>
                <Form.ContainerActions>
                    <Button
                        disabled={isLoading}
                        type="submit"
                    >
                        Buscar
                    </Button>
                </Form.ContainerActions>
            </Form.Root>
            {(patients) && (
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