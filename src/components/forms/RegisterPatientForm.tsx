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
        setValue,
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
                    id="identity"
                    type="number"
                    label="CPF"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input
                    id="birthDate"
                    type="date"
                    label="Data de nascimento"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Select
                    id="gender"
                    label="Gênero"
                    options={['masculino', 'feminino']}
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input
                    id="nextConsultation"
                    type="datetime-local"
                    label="Próxima consulta"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
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
                    options={['sim', 'não']}
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    onChange={(e) => {
                        const isTrue =  e.target.value === 'sim'
                        setHaveHealthPlan(isTrue)}
                    }
                />
                {haveHealthPlan && (
                    <>
                        <Input
                            id="healthInsuranceName"
                            label="Nome do plano"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        />
                        <Input
                            id="healthInsuranceNumber"
                            label="Número do plano"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
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
                    id="information"
                    label="Informações"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="relative mt-3">
                <div
                    className="
                        absolute
                        inset-0
                        flex
                        items-center
                    "
                >
                    <div className="w-full border-t-2 border-neutral-400/60" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="font-semibold text-3xl bg-neutral-200 px-4">
                        Endereço
                    </span>
                </div>
            </div>
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
                    id="postalCode"
                    label="CEP"
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    onChange={(e) => handleGetAddress(e.target.value)}
                />
                <Input
                    id="address"
                    label="Endereço"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input
                    id="number"
                    label="Número"
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input
                    id="complement"
                    label="Complemento"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                />
                <Input
                    id="neighborhood"
                    label="Bairro"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input
                    id="city"
                    label="Cidade"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input
                    id="state"
                    label="Estado"
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

export default RegisterPatientForm;