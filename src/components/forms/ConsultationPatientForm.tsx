'use client'

import axios from "axios"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import Button from "../buttons/Button"
import Input from "../inputs/Input"
import { Patient } from "@prisma/client"
import Textarea from "../inputs/Textarea"
import Title from "../Title"
import Form from "../Form"

export interface ConsultationPatientFormType {
    patientId: string;
    doctorId: string;
    dateTime: string;
    healthInsuranceName: string;
    healthInsuranceNumber: string;
    diagnosis: string;
    treatment: string;
    amountPaid: string;
}

interface ConsultationPatientFormProps {
    doctorId: string;
    patient: Patient | null;
}


const ConsultationPatientForm: React.FC<ConsultationPatientFormProps> = ({
    doctorId,
    patient
}) => {
    const router = useRouter()
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
            patientId: patient?.id,
            doctorId: doctorId,
            dateTime: '',
            healthInsuranceName: patient?.healthInsuranceName,
            healthInsuranceNumber: patient?.healthInsuranceNumber,
            diagnosis: '',
            treatment: '',
            amountPaid: '',
        }
    })

    useEffect(() => {
        reset({
            patientId: patient?.id,
            doctorId: doctorId,
            healthInsuranceName: patient?.healthInsuranceName,
            healthInsuranceNumber: patient?.healthInsuranceNumber,
        })
    }, [doctorId, patient, reset])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('/api/consultation', data)
        .then(() => {
            toast.success('Atendimento cadastrado!')
            router.refresh()
            router.push('/')
        })
        .catch(() => toast.error('Algo deu errado!'))
        .finally(() => setIsLoading(false))
    }

    return (
        <> 
            {doctorId && patient && (
                <>
                    <Title title="Atendimento" />
                    <Form.Root onSubmit={handleSubmit(onSubmit)}>
                        <Textarea
                            label="Diagnóstico"
                            disabled={isLoading}
                            {...register("diagnosis" , { required: false })}
                            errors={errors?.diagnosis}
                        />
                        <Textarea
                            label="Tratamento"
                            disabled={isLoading}
                            {...register("treatment" , { required: false })}
                            errors={errors?.treatment}
                        />
                        <Form.Container>
                            {/* <DropdownSelectMenu
                                id="doctorId"
                                label="Dotor"
                                errors={errors}
                                register={register}
                                disabled={isLoading}
                                option={(selected) => reset({ doctorId: selected?.value })}
                                options={[{value: '1', label: 'priemiro'}, {value: '2', label: 'segundo'}]}
                                placeholder="Buscar"
                                required
                            /> */}
                            <Input
                                label="Dia e hora"
                                type="datetime-local"
                                disabled={isLoading}
                                {...register("dateTime" , { required: true })}
                                errors={errors?.dateTime}
                            />
                            <Input
                                label="Valor R$"
                                type="number"
                                disabled={isLoading}
                                {...register("amountPaid" , { required: true })}
                                errors={errors?.amountPaid}
                            />
                        </Form.Container>
                        <Form.ContainerActions>
                            <Button
                                disabled={isLoading}
                                type="submit"
                            >
                                Cadastrar
                            </Button>
                        </Form.ContainerActions>
                    </Form.Root>
                </>
            )}
        </>
    )
}

export default ConsultationPatientForm;