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

const SearchPatients = () => {
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
                        lowercase
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
                {(patients?.length === 0) && (
                    <span className="text-center">Nenhum paciente encontrado</span>
                )}
                <Form.ContainerActions>
                    <Button
                        disabled={isLoading}
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
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {patients?.map((patient) => (
                                <Table.Tr 
                                    key={patient.id}
                                    onClick={() => route.push(`/patient/${patient.id}`)}
                                >
                                    <Table.Td>{patient.name}</Table.Td>
                                    <Table.Td>{patient.identity}</Table.Td>
                                    <Table.Td>{patient.email}</Table.Td>
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