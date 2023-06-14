'use client'
import Button from "@/components/buttons/Button";
import Input from "@/components/inputs/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

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
        setIsLoading(true)

        axios.post('/api/register/doctor', data)
        .then(() => {
            toast.success('Médico cadastrado!')
            router.push('/')
        })
        .catch(() => toast.error('Algo deu errado!'))
        .finally(() => setIsLoading(false))
    }

    return (
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 flex flex-col justify-between gap-9"
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
                    id="name"
                    label="Nome"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input
                    id="email"
                    type="email"
                    label="E-mail"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input
                    id="phone"
                    type="number"
                    label="Telefone"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input
                    id="specialty"
                    label="Especialidade"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input
                    id="crm"
                    label="CRM"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
            <div className="flex justify-end">
                <Button
                    disabled={isLoading}
                    type="submit"
                >
                    Cadastrar
                </Button>
            </div>
        </form>
    )
}

export default RegisterDoctorForm;