'use client'
import Button from "@/components/buttons/Button";
import Input from "@/components/inputs/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Textarea from "../inputs/Textarea";
import Select from "../inputs/Select";
import Title from "../Title";
import InputTextMask from "../inputs/InputTextMask";
import { handleCEPMask, handleCPFMask, handlePhoneMask } from "@/utils/masks";
import Form from "../Form";
import Line from "../Line";

// const schema = z.object({
//     name: z.string().min(3, 'Minimo 3 caracteres'),
//     identity: z.string().min(11),
//     birthDate: z.date(),
//     gender: z.enum(['sim', 'não']),
//     phone: z.number(),
//     email: z.string().email(),
//     healthInsurance: z.string(),
//     healthInsuranceName: z.string(),
//     healthInsuranceNumber: z.number(),
//     information: z.string(),
//     nextConsultation: z.date(),
//     address: z.string(),
//     number: z.number(),
//     complement: z.string(),
//     neighborhood: z.string(),
//     state: z.string(),
//     postalCode: z.string().min(9),
//     city: z.string(),
// })

// type FormPatientProps = z.infer<typeof schema>

export type Address = {
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
    healthInsuranceName?: string | null;
    healthInsuranceNumber?: string | null;
    information?: string | null;
    nextConsultation: string;
    address: string;
    number: string;
    complement?: string | null;
    neighborhood: string;
    state: string;
    postalCode: string;
    city: string;
}

const RegisterPatientForm = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: {
            errors,
        }
    } = useForm<FormPatient>({
        // mode: 'all',
        // reValidateMode: "onSubmit",
        // resolver: zodResolver(schema)
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
    }
    )
    

    const onSubmit: SubmitHandler<FormPatient> = (data) => {
        const formattedData: FormPatient = {
            ...data,
            identity: data.identity.replace(/\D/g, ''),
            phone: data.phone.replace(/\D/g, ''),
            postalCode: data.postalCode.replace(/\D/g, ''),
        }

        setIsLoading(true)
        axios.post('/api/patient', formattedData)
        .then(() => {
            toast.success('Paciente cadastrado!')
            router.refresh()
            router.push('/')
        })
        .catch(() => toast.error('Algo deu errado!'))
        .finally(() => setIsLoading(false))
    }

    const handleGetAddress = useCallback((cep: string) => {
        if (cep.length === 9) {
            axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`)
            .then((response) => response.data)
            .then((response: Address) => {
                setValue('address', response.street)
                setValue('neighborhood', response.neighborhood)
                setValue('city', response.city)
                setValue('state', response.state)
            })
            .catch(() => {})
        } else {
            setValue('address', '')
            setValue('neighborhood', '')
            setValue('city', '')
            setValue('state', '')
        }
    }, [setValue])  
    
    return (
        <>
        {/* <form 
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
                    label="Telefone"
                    disabled={isLoading}
                    {...register("phone" , {
                        required: true,
                        maxLength: 15,
                        minLength: 15
                    })}
                    onChange={(e) => setValue('phone', handlePhoneMask(e.target.value))}
                    errors={errors.phone}
                />
                <Input
                    label="CPF"
                    disabled={isLoading}
                    {...register("identity", {
                        required: true,
                        maxLength: 14,
                        minLength: 14,
                    })}
                    onChange={(e) => setValue('identity', handleCPFMask(e.target.value))}
                    errors={errors.identity}
                />
                <Input
                    type="date"
                    label="Data de nascimento"
                    disabled={isLoading}
                    {...register("birthDate" , { required: true })}
                    errors={errors.birthDate}
                    dateMax
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
                    dateMin
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
                    label="Possui plano de saúde?"
                    options={[{label: 'sim'}, {label: 'não'}]}
                    disabled={isLoading}
                    {...register("healthInsurance" , { required: true })}
                    errors={errors.healthInsurance}
                    onChange={(e) => {
                        setValue('healthInsurance', e.target.value)
                        if((e.target.value === 'não')) {
                            setValue('healthInsuranceName', '')
                            setValue('healthInsuranceNumber', '')
                        }
                    }}
                />
                <Input
                    id="healthInsuranceName"
                    label="Nome do plano"
                    disabled={isLoading}
                    hidden={watch('healthInsurance') === 'não'}
                    {...register("healthInsuranceName" , { required: watch('healthInsurance') === 'sim' })}
                    errors={errors.healthInsuranceName}
                />
                <InputTextMask
                    label="Número do plano"
                    mask="999999999999999999999999999999999"
                    disabled={isLoading}
                    hidden={watch('healthInsurance') === 'não'}
                    {...register("healthInsuranceNumber" , { required: watch('healthInsurance') === 'sim' })}
                    errors={errors.healthInsuranceNumber}
                />
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
                    disabled={isLoading}
                    {...register("postalCode" , { 
                        required: true,
                        maxLength: 9,
                        minLength: 9
                    })}
                    errors={errors.postalCode}
                    onChange={(e) => {
                        handleGetAddress(e.target.value)
                        setValue('postalCode', handleCEPMask(e.target.value))
                    }}
                />
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
                    label="Endereço"
                    disabled={isLoading}
                    {...register("address" , { required: true })}
                    errors={errors.address}
                />
                <InputTextMask
                    label="Número"
                    mask="9999999"
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
                <InputTextMask
                    mask="aa"
                    label="Estado"
                    uppercase
                    disabled={isLoading}
                    {...register("state" , { 
                        required: true,
                        maxLength: 2,
                        minLength: 2,
                    })}
                    errors={errors.state}
                />
            </div>
            <div className="flex justify-end flex-wrap gap-6">
                <Button
                    disabled={isLoading}
                    type="submit"
                >
                    Cadastrar
                </Button>
            </div>
        </form> */}
        <Form.Root
            onSubmit={handleSubmit(onSubmit)}
        >
            <Form.Container>
                <Input
                    label="Nome"
                    disabled={isLoading}
                    {...register("name" , { required: true })}
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
                <Input
                    label="Telefone"
                    disabled={isLoading}
                    {...register("phone" , {
                        required: true,
                        maxLength: 15,
                        minLength: 15
                    })}
                    onChange={(e) => setValue('phone', handlePhoneMask(e.target.value))}
                    errors={errors.phone}
                />
                <Input
                    label="CPF"
                    disabled={isLoading}
                    {...register("identity", {
                        required: true,
                        maxLength: 14,
                        minLength: 14,
                    })}
                    onChange={(e) => setValue('identity', handleCPFMask(e.target.value))}
                    errors={errors.identity}
                />
                <Input
                    type="date"
                    label="Data de nascimento"
                    disabled={isLoading}
                    {...register("birthDate" , { required: true })}
                    errors={errors.birthDate}
                    dateMax
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
                    dateMin
                />
            </Form.Container>
            <Line />
            <Form.Container>
                <Select
                    label="Possui plano de saúde?"
                    options={[{label: 'sim'}, {label: 'não'}]}
                    disabled={isLoading}
                    {...register("healthInsurance" , { required: true })}
                    errors={errors.healthInsurance}
                    onChange={(e) => {
                        setValue('healthInsurance', e.target.value)
                        if((e.target.value === 'não')) {
                            setValue('healthInsuranceName', '')
                            setValue('healthInsuranceNumber', '')
                        }
                    }}
                />
                <Input
                    id="healthInsuranceName"
                    label="Nome do plano"
                    disabled={isLoading}
                    hidden={watch('healthInsurance') !== 'sim'}
                    {...register("healthInsuranceName" , { required: watch('healthInsurance') === 'sim' })}
                    errors={errors.healthInsuranceName}
                />
                <InputTextMask
                    label="Número do plano"
                    mask="999999999999999999999999999999999"
                    disabled={isLoading}
                    hidden={watch('healthInsurance') !== 'sim'}
                    {...register("healthInsuranceNumber" , { required: watch('healthInsurance') === 'sim' })}
                    errors={errors.healthInsuranceNumber}
                />
            </Form.Container>
            <Line />
            <Textarea
                label="Informações"
                disabled={isLoading}
                {...register("information" , { required: false })}
                errors={errors.information}
            />
            <Title title="Endereço" />
            <Form.Container>
                <Input
                    label="CEP"
                    disabled={isLoading}
                    {...register("postalCode" , { 
                        required: true,
                        maxLength: 9,
                        minLength: 9
                    })}
                    errors={errors.postalCode}
                    onChange={(e) => {
                        handleGetAddress(e.target.value)
                        setValue('postalCode', handleCEPMask(e.target.value))
                    }}
                />
            </Form.Container>
            <Form.Container>
                <Input
                    label="Endereço"
                    disabled={isLoading}
                    {...register("address" , { required: true })}
                    errors={errors.address}
                />
                <InputTextMask
                    label="Número"
                    mask="9999999"
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
                    uppercase
                    disabled={isLoading}
                    {...register("state" , { 
                        required: true,
                        maxLength: 2,
                        minLength: 2,
                    })}
                    errors={errors.state}
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
    )
}

export default RegisterPatientForm;