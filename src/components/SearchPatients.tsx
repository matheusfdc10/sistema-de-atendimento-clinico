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
import Table from "./Table";
import Link from "next/link";
import { FaUserEdit } from "react-icons/fa";

const SearchPatients = () => {
    const route = useRouter()
    const [patients, setPatients] = useState<Patient[] | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        setValue,
        watch,
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

    const inputs = watch(['name', 'identity', 'phone', 'email', 'healthInsuranceNumber', 'nextConsultation'])

    const atLeastOneEntry = inputs.some((input) => input !== '')

    return (
        <>
            <Form.Root onSubmit={handleSubmit(onSubmit)}>
                <Form.Container>
                    <Input
                        label="Nome"
                        disabled={isLoading}
                        {...register("name" , { required: !atLeastOneEntry , minLength: 3})}
                        errors={errors.name}
                    />
                    <Input
                        label="CPF"
                        disabled={isLoading}
                        {...register("identity", {
                            required: !atLeastOneEntry,
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
                        {...register("healthInsuranceNumber" , { required: !atLeastOneEntry })}
                        errors={errors.healthInsuranceNumber}
                    />
                    <Input
                        type="email"
                        label="E-mail"
                        lowercase
                        disabled={isLoading}
                        {...register("email" , { required: !atLeastOneEntry })}
                        errors={errors.email}
                    />
                    <Input
                        label="Telefone"
                        disabled={isLoading}
                        {...register("phone" , {
                            required: !atLeastOneEntry,
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
                        {...register("nextConsultation" , { required: !atLeastOneEntry })}
                        errors={errors.nextConsultation}
                    />
                </Form.Container>
                {(!atLeastOneEntry) && (
                    <span className="text-center text-rose-500 font-medium">Preencha pelo menos um campo</span>
                )}
                {(patients?.length === 0) && (
                    <span className="text-center">Nenhum paciente encontrado</span>
                )}
                <Form.ContainerActions>
                    <Button
                        disabled={isLoading || !atLeastOneEntry}
                        type="submit"
                    >
                        Buscar
                    </Button>
                </Form.ContainerActions>
            </Form.Root>
            
            {!!(patients?.length) && (
                <div className="mt-6">
                    <Table.Root>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th scope="coll">Nome</Table.Th>
                                <Table.Th scope="coll">CPF</Table.Th>
                                <Table.Th scope="coll">Email</Table.Th>
                                <Table.Th scope="coll">{}</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {patients?.map((patient) => (
                                <Table.Tr key={patient.id}>
                                    <Table.Td>{patient.name}</Table.Td>
                                    <Table.Td>{handleCPFMask(patient.identity)}</Table.Td>
                                    <Table.Td>{patient.email}</Table.Td>
                                    <Table.Td className="w-full">
                                        <div className="flex gap-6 justify-center items-center">
                                            <Link title="Editar" href={`/patient/${patient.id}`}>
                                                <FaUserEdit className="text-2xl text-sky-500 hover:text-sky-600 cursor-pointer"/>
                                            </Link>
                                        </div>
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table.Root>
                </div>
            )}
        </>
    )
}

export default SearchPatients;