'use client'
import { Consultation, Doctor } from "@prisma/client";
import Form from "../Form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Button from "../buttons/Button";
import { convertDateHours } from "./UpdatePatientForm";
import { FullConsultationType } from "@/types";
import Title from "../Title";
import Input from "../inputs/Input";
import { calculateAge, selectDoctor } from "../NewConsultation";
import Line from "../Line";
import Textarea from "../inputs/Textarea";
import Select from "../inputs/Select";
import InputTextMask from "../inputs/InputTextMask";

interface UpdateConsultationFormProps {
    consultation: FullConsultationType;
    doctors: Doctor[];
}

const UpdateConsultationForm: React.FC<UpdateConsultationFormProps> = ({
    consultation,
    doctors
}) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isHealthInsurance, setIsHealthInsurance] = useState(!!consultation.healthInsuranceName)
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            ...consultation,
            // patientId: patient?.id,
            doctorId: consultation.doctorId,
            dateTime: convertDateHours(consultation.dateTime),
            healthInsuranceName: consultation.healthInsuranceName,
            healthInsuranceNumber: consultation.healthInsuranceNumber,
            diagnosis: consultation.diagnosis,
            treatment: consultation.treatment,
            amountPaid: consultation.amountPaid,
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const formattedData = {
            ...data
        }
        // console.log(new Date('2023-07-06T10:30:00').toISOString())
        setIsLoading(true)
        
        axios.put(`/api/consultation/${data.id}`, formattedData)
        .then(() => {
            toast.success('Consultation atualizado!')
            router.refresh()
            router.push('/')
        })
        .catch(() => toast.error('Algo deu errado!'))
        .finally(() => setIsLoading(false))
    }

    // useEffect(() => {
    //     reset()
    // }, [reset])


    return (
        <Form.Root onSubmit={handleSubmit(onSubmit)}>
            <Title title="Paciente" />
            <Form.Container>
                <Input
                    label="Nome"
                    disabled
                    value={consultation.patient.name}     
                />
                <Input
                    label="Idade"
                    disabled
                    value={calculateAge(new Date(consultation.patient.birthDate))}
                />
                <InputTextMask
                    label="Telefone"
                    mask="(99) 99999-9999"
                    disabled
                    value={consultation.patient.phone}
                />
                <Input
                    type="email"
                    label="E-mail"
                    lowercase
                    disabled
                    value={consultation.patient.email}
                />
            </Form.Container>
            {consultation.patient?.information && (
                <Textarea
                    label="Observação"
                    disabled
                    value={consultation.patient.information}
                />
            )}
            <Title title="Plano de saúde"/>
            <Form.Container>
                <Select
                    label="Possui plano de saúde?"
                    options={[{label: 'sim'}, {label: 'não'}]}
                    value={isHealthInsurance ? 'sim' : 'não'}
                    disabled={isLoading}
                    onChange={(e) => {
                        if((e.target.value === 'não')) {
                            setIsHealthInsurance(false)
                            setValue('healthInsuranceName', '')
                            setValue('healthInsuranceNumber', '')
                        } else {
                            setIsHealthInsurance(true)
                            setValue('healthInsuranceName', consultation.healthInsuranceName)
                            setValue('healthInsuranceNumber', consultation.healthInsuranceNumber)
                        }
                    }}
                />
                <Input
                    label="Nome"
                    disabled={isLoading}
                    hidden={!isHealthInsurance}
                    {...register("healthInsuranceName" , { required: isHealthInsurance })}
                    errors={errors.healthInsuranceName}
                />
                <Input
                    label="Número"
                    disabled={isLoading}
                    hidden={!isHealthInsurance}
                    {...register("healthInsuranceNumber" , { required: isHealthInsurance })}
                    errors={errors.healthInsuranceNumber}
                />
            </Form.Container>
            <Title title="Médico"/>
            <Form.Container>
                <Select
                    options={selectDoctor(doctors)}
                    label="Dotor"
                    capitalize
                    disabled={isLoading}
                    {...register("doctorId" , { required: true })}
                    errors={errors.doctorId}
                />
            </Form.Container>
            <Line />
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
                    type="submit"
                    disabled={isLoading}
                >
                    Atualizar
                </Button>
            </Form.ContainerActions>
        </Form.Root>
    )
}

export default UpdateConsultationForm;