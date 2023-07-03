'use client'
import { Doctor } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Form from "./Form";
import Title from "./Title";
import Select from "./inputs/Select";
import { selectDoctor } from "./NewConsultation";
import Button from "./buttons/Button";
import Input from "./inputs/Input";
import { handleCPFMask, handlePhoneMask } from "@/utils/masks";
import InputTextMask from "./inputs/InputTextMask";
import { FullConsultationType } from "@/types";
import Table from "./Table";
import { formatDateTime } from "@/utils/format";

interface SearchConsultationProps {
    doctors: Doctor[] | null
}

const SearchConsultation: React.FC<SearchConsultationProps> = ({
    doctors
}) => {
    const router = useRouter()
    const [consultations, setConsultations] = useState<FullConsultationType[] | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            patientName: '',
            patientIdentity: '',
            patientPhone: '',
            patientEmail: '',
            patientHealthInsuranceNumber: '',
            patientNextConsultation: '',

            doctorId: '',
            doctorName: '',
            doctorEmail: '',
            doctorPhone: '',
            doctorSpecialty: '',
            doctorCrm: '',

            dateTime: '',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const formattedData = {
            ...data,
            patientIdentity: data.patientIdentity?.replace(/\D/g, ''),
            patientPhone: data.patientPhone?.replace(/\D/g, ''),
            doctorPhone: data.doctorPhone?.replace(/\D/g, ''),
        }
        setIsLoading(true)
        
        axios.post('/api/consultation/search', formattedData)
        .then((response) => response.data)
        .then((data) => {
            setConsultations(data);
            !data?.length && toast.error('Nenhuma consulta encontrada')
        })
        .catch(() => toast.error('Algo deu errado!'))
        .finally(() => setIsLoading(false))
    }

    return (
        <>
            <Form.Root onSubmit={handleSubmit(onSubmit)}>
                <Form.Container>
                    <Input
                        type="datetime-local"
                        label="Dia e hora"
                        dateMin
                        disabled={isLoading}
                        {...register("dateTime" , { required: false })}
                        errors={errors.dateTime}
                    />
                </Form.Container>
                <Title title="Médico"/>
                <Form.Container>
                    <Select
                        options={selectDoctor(doctors)}
                        label="Dotor"
                        capitalize
                        disabled={isLoading}
                        {...register("doctorId" , { required: false })}
                        errors={errors.doctorId}
                    />
                    <Input
                        label="Especialidade"
                        disabled={isLoading}
                        {...register("doctorSpecialty" , { required: false })}
                        errors={errors.doctorSpecialty}
                    />
                </Form.Container>
                <Title title="Paciente"/>
                <Form.Container>
                    <Input
                        label="Nome"
                        disabled={isLoading}
                        {...register("patientName" , { required: false , minLength: 3})}
                        errors={errors.patientName}
                    />
                    <Input
                        label="CPF"
                        disabled={isLoading}
                        {...register("patientIdentity", {
                            required: false,
                            maxLength: 14,
                            minLength: 14,
                        })}
                        onChange={(e) => setValue('patientIdentity', handleCPFMask(e.target.value))}
                        errors={errors.patientIdentity}
                    />
                    <InputTextMask
                        label="Número do plano"
                        mask="9999999999999999999999999999999"
                        disabled={isLoading}
                        {...register("patientHealthInsuranceNumber" , { required: false })}
                        errors={errors.patientHealthInsuranceNumber}
                    />
                    <Input
                        type="email"
                        label="E-mail"
                        lowercase
                        disabled={isLoading}
                        {...register("patientEmail" , { required: false })}
                        errors={errors.patientEmail}
                    />
                    <Input
                        label="Telefone"
                        disabled={isLoading}
                        {...register("patientPhone" , {
                            required: false,
                            maxLength: 15,
                            minLength: 15
                        })}
                        onChange={(e) => setValue('patientPhone', handlePhoneMask(e.target.value))}
                        errors={errors.patientPhone}
                    />
                </Form.Container>
                {(consultations?.length === 0) && (
                    <span className="text-center">Nenhuma consulta encontrado</span>
                )}
                <Form.ContainerActions>
                    <Button type="submit">
                        Buscar
                    </Button>
                </Form.ContainerActions>
            </Form.Root>

            {!!(consultations?.length) && (
                <div className="mt-6">
                    <Table.Root>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th scope="coll">Paciente</Table.Th>
                                <Table.Th scope="coll">Médico</Table.Th>
                                <Table.Th scope="coll">Dia e hora</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {consultations?.map((consultation) => (
                                <Table.Tr 
                                    key={consultation.id}
                                    onClick={() => router.push(`/consultation/${consultation.id}`)}
                                >
                                    <Table.Td>{consultation.patient.name}</Table.Td>
                                    <Table.Td>{consultation.doctor.name}</Table.Td>
                                    <Table.Td>{formatDateTime(consultation.dateTime)}</Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table.Root>
                </div>
            )}
        </>
    )
}

export default SearchConsultation;