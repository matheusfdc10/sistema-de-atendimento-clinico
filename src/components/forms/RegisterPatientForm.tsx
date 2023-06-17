'use client'
import Button from "@/components/buttons/Button";
import Input from "@/components/inputs/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Textarea from "../inputs/Textarea";
import Select from "../inputs/Select";
import Title from "../Title";

type Address = {
    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
}

export interface FormPatient {
    name: string;
    identity: string;
    birthDate: string;
    gender: string;
    phone: string;
    email: string;
    healthInsurance: string;
    healthInsuranceName?: string;
    healthInsuranceNumber?: string;
    information?: string;
    nextConsultation: string;
    address: string;
    number: string;
    complement?: string;
    neighborhood: string;
    state: string;
    postalCode: string;
    city: string;
}

const RegisterPatientForm = () => {
    const [haveHealthPlan, setHaveHealthPlan] = useState<boolean | undefined>(undefined)
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
        }
    } = useForm<FormPatient | FieldValues>({
        defaultValues: {
            name: '',
            identity: '',
            birthDate: '',
            gender: '',
            phone: '',
            email: '',
            healthInsurance: '',
            healthInsuranceName: '',
            healthInsuranceNumber: '',
            information: '',
            nextConsultation: '',
            address: '',
            number: '',
            complement: '',
            neighborhood: '',
            state: '',
            postalCode: '',
            city: '',
        }
    })
    

    const onSubmit: SubmitHandler<FieldValues | FormPatient> = (data) => {
        setIsLoading(true)
        
        axios.post('/api/register/patient', data)
        .then(() => {
            toast.success('Paciente cadastrado!')
            router.push('/')
        })
        .catch(() => toast.error('Algo deu errado!'))
        .finally(() => setIsLoading(false))
    }

    const handleGetAddress = useCallback((cep: string) => {
        if (cep.length === 8) {
            axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`)
            .then((response) => response.data)
            .then((response: Address) => {
                reset({
                    address: response.street,
                    neighborhood: response.neighborhood,
                    street: response.street,
                    city: response.city,
                    state: response.state,
                })
            })
            .catch(() => {})
        } else {
            reset({
                address: '',
                neighborhood: '',
                street: '',
                city: '',
                state: '',
            })
        }
    }, [reset])

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
                    label="Nome"
                    disabled={isLoading}
                    {...register("name" , { required: true })}
                    errors={errors.name}
                />
                <Input
                    type="email"
                    label="E-mail"
                    disabled={isLoading}
                    {...register("email" , { required: true })}
                    errors={errors.email}
                />
                <Input
                    type="number"
                    label="Telefone"
                    disabled={isLoading}
                    {...register("phone" , { required: true })}
                    errors={errors.phone}
                />
                <Input
                    type="number"
                    label="CPF"
                    disabled={isLoading}
                    {...register("identity" , { required: true })}
                    errors={errors.identity}
                />
                <Input
                    type="date"
                    label="Data de nascimento"
                    disabled={isLoading}
                    {...register("birthDate" , { required: true })}
                    errors={errors.birthDate}
                />
                <Select
                    label="Gênero"
                    options={[{label: 'masculino'}, {label: 'feminino'}]}
                    disabled={isLoading}
                    {...register("gender" , { required: true })}
                    errors={errors.gender}
                />
                <Input
                    id="nextConsultation"
                    type="datetime-local"
                    label="Próxima consulta"
                    disabled={isLoading}
                    {...register("nextConsultation" , { required: false })}
                    errors={errors.nextConsultation}
                />
            </div>
            <div className="w-full border-t-2 border-neutral-400/60" />
            <div className="
                grid 
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                2xl:grid-cols-5
                gap-6
            ">
                <Select
                    id="healthInsurance"
                    label="Possui plano de saúde?"
                    options={[{label: 'sim'}, {label: 'não'}]}
                    disabled={isLoading}
                    {...register("healthInsurance" , { required: true })}
                    errors={errors.healthInsurance}
                    onChange={(e) => {
                        const isTrue =  e.target.value === 'sim';
                        setHaveHealthPlan(isTrue)}
                    }
                />
                {haveHealthPlan && (
                    <>
                        <Input
                            id="healthInsuranceName"
                            label="Nome do plano"
                            disabled={isLoading}
                            {...register("healthInsuranceName" , { required: true })}
                            errors={errors.healthInsuranceName}
                        />
                        <Input
                            label="Número do plano"
                            disabled={isLoading}
                            {...register("healthInsuranceNumber" , { required: true })}
                            errors={errors.healthInsuranceNumber}
                        />
                    </>
                )}
            </div>
            <div className="w-full border-t-2 border-neutral-400/60" />
            <div className="
                grid 
                grid-cols-1
            ">
                <Textarea
                    label="Informações"
                    disabled={isLoading}
                    {...register("information" , { required: false })}
                    errors={errors.information}
                />
            </div>
            <Title title="Endereço" />
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
                    label="CEP"
                    type="number"
                    disabled={isLoading}
                    {...register("postalCode" , { required: true })}
                    errors={errors.postalCode}
                    onChange={(e) => handleGetAddress(e.target.value)}
                />
                <Input
                    label="Endereço"
                    disabled={isLoading}
                    {...register("address" , { required: true })}
                    errors={errors.address}
                />
                <Input
                    label="Número"
                    type="number"
                    disabled={isLoading}
                    {...register("number" , { required: true })}
                    errors={errors.number}
                />
                <Input
                    label="Complemento"
                    disabled={isLoading}
                    {...register("complement" , { required: false })}
                    errors={errors.complement}
                />
                <Input
                    label="Bairro"
                    disabled={isLoading}
                    {...register("neighborhood" , { required: true })}
                    errors={errors.neighborhood}
                />
                <Input
                    label="Cidade"
                    disabled={isLoading}
                    {...register("city" , { required: true })}
                    errors={errors.city}
                />
                <Input
                    label="Estado"
                    disabled={isLoading}
                    {...register("state" , { required: true })}
                    errors={errors.state}
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

export default RegisterPatientForm;