'use client'

import { Doctor } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Form from "../Form";
import Input from "../inputs/Input";
import InputTextMask from "../inputs/InputTextMask";
import Button from "../buttons/Button";

interface UpdateDoctorFormProps {
    doctor: Doctor,
}

const UpdateDoctorForm: React.FC<UpdateDoctorFormProps> = ({
    doctor
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
            ...doctor,
            phone: doctor.phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'),
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const formattedData = {
            ...data,
            phone: data.phone.replace(/\D/g, '')
        }
        setIsLoading(true)

        axios.put(`/api/doctor/${data.id}`, formattedData)
        .then(() => {
            toast.success('Médico atualizado!')
            router.refresh()
            router.push('/')
        })
        .catch(() => toast.error('Algo deu errado!'))
        .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        reset()
    }, [reset])

    return (
        <Form.Root onSubmit={handleSubmit(onSubmit)}>
            <Form.Container>
                <Input
                    label="Nome"
                    disabled={isLoading}
                    {...register("name" , { required: true, minLength: 3 })}
                    errors={errors.name}
                />
                <Input
                    type="email"
                    label="E-mail"
                    lowercase
                    disabled={isLoading}
                    {...register("email" , { required: true })}
                    errors={errors.email}
                />
                <InputTextMask
                    label="Telefone"
                    mask="(99) 99999-9999"
                    disabled={isLoading}
                    {...register("phone" , {
                        required: true,
                        maxLength: 15,
                        minLength: 15
                    })}
                    errors={errors.phone}
                />
                <Input
                    label="Especialidade"
                    disabled={isLoading}
                    {...register("specialty" , { required: true })}
                    errors={errors.specialty}
                />
                <Input
                    label="CRM"
                    disabled={isLoading}
                    {...register("crm" , { required: true })}
                    errors={errors.crm}
                />
            </Form.Container>
            <Form.ContainerActions>
                <Button
                    disabled={isLoading}
                    type="submit"
                >
                    Atualizar
                </Button>
            </Form.ContainerActions>
        </Form.Root>
    )
}

export default UpdateDoctorForm;