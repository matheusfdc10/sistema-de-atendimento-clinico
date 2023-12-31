'use client'

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Form from "./Form";
import Button from "./buttons/Button";
import Input from "./inputs/Input";
import InputTextMask from "./inputs/InputTextMask";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Doctor } from "@prisma/client";
import Table from "./Table";
import Link from "next/link";
import { FaUserEdit } from 'react-icons/fa'

const SearchDoctors = () => {
    const [doctors, setDoctors] = useState<Doctor[] | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        watch,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            specialty: '',
            crm: '',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const formattedData = {
            ...data,
            phone: data.phone.replace(/\D/g, '')
        }
        setIsLoading(true)

        axios.post('/api/doctor/search', formattedData)
        .then((response) => response.data)
        .then((data) => {
            setDoctors(data);
            !data?.length && toast.error('Nenhum médico encontrado')
        })
        .catch(() => toast.error('Algo deu errado!'))
        .finally(() => setIsLoading(false))
    }

    const inputs = watch(['name', 'email', 'phone', 'specialty', 'crm'])

    const atLeastOneEntry = inputs.some((input) => input !== '')
    
    return (
        <>
            <Form.Root onSubmit={handleSubmit(onSubmit)}>
                <Form.Container>
                    <Input
                        label="Nome"
                        disabled={isLoading}
                        {...register("name" , { required: !atLeastOneEntry, minLength: 3 })}
                        errors={errors.name}
                    />
                    <Input
                        label="Especialidade"
                        disabled={isLoading}
                        {...register("specialty" , { required: !atLeastOneEntry })}
                        errors={errors.specialty}
                    />
                    <Input
                        type="email"
                        label="E-mail"
                        lowercase
                        disabled={isLoading}
                        {...register("email" , { required: !atLeastOneEntry })}
                        errors={errors.email}
                    />
                    <InputTextMask
                        label="Telefone"
                        mask="(99) 99999-9999"
                        disabled={isLoading}
                        {...register("phone" , {
                            required: !atLeastOneEntry,
                            maxLength: 15,
                            minLength: 15
                        })}
                        errors={errors.phone}
                    />
                    <Input
                        label="CRM"
                        disabled={isLoading}
                        {...register("crm" , { required: !atLeastOneEntry })}
                        errors={errors.crm}
                    />
                </Form.Container>
                {(!atLeastOneEntry) && (
                    <span className="text-center text-rose-500 font-medium">Preencha pelo menos um campo</span>
                )}
                {(doctors?.length === 0) && (
                    <span className="text-center">Nenhum médico encontrado</span>
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

            {!!(doctors?.length) && (
                <div className="mt-6">
                    <Table.Root>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th scope="coll">Nome</Table.Th>
                                <Table.Th scope="coll">Especialidade</Table.Th>
                                <Table.Th scope="coll">Email</Table.Th>
                                <Table.Th scope="coll">{}</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {doctors?.map((doctor) => (
                                <Table.Tr key={doctor.id}>
                                    <Table.Td>{doctor.name}</Table.Td>
                                    <Table.Td>{doctor.specialty}</Table.Td>
                                    <Table.Td>{doctor.email}</Table.Td>
                                    <Table.Td className="w-full">
                                        <div className="flex gap-6 justify-center items-center">
                                            <Link title="Editar" href={`/doctor/${doctor.id}`}>
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

export default SearchDoctors;