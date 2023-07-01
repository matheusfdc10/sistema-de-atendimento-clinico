'use client'
import Button from "@/components/buttons/Button";
import Input from "@/components/inputs/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Form from "../Form";
import InputTextMask from "../inputs/InputTextMask";

const RegisterDoctorForm = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
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

        axios.post('/api/doctor', formattedData)
        .then(() => {
            toast.success('Médico cadastrado!')
            router.refresh()
            router.push('/')
        })
        .catch(() => toast.error('Algo deu errado!'))
        .finally(() => setIsLoading(false))
    }

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
                    Cadastrar
                </Button>
            </Form.ContainerActions>
        </Form.Root>
    )
}

export default RegisterDoctorForm;