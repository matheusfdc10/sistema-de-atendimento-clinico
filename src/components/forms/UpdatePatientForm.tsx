'use client'

import { Patient } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Address, FormPatient } from "./RegisterPatientForm";
import axios from "axios";
import { toast } from "react-hot-toast";
import Input from "../inputs/Input";
import Select from "../inputs/Select";
import Textarea from "../inputs/Textarea";
import Title from "../Title";
import Button from "../buttons/Button";
import InputTextMask from "../inputs/InputTextMask";
import Form from "../Form";
import Line from "../Line";
import { momentDate } from "@/utils/format";

interface UpdatePatientFormProps {
    patient: Patient,
}

const UpdatePatientForm: React.FC<UpdatePatientFormProps> = ({
    patient
}) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: {
            errors,
        }
    } = useForm<FormPatient>({
        defaultValues: {
            ...patient,
            name: patient.name,
            identity: patient.identity.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
            birthDate: convertDate(patient.birthDate),
            gender: patient.gender,
            phone: patient.phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'),
            email: patient.email,
            healthInsurance: patient.healthInsurance ? 'sim' : 'não',
            healthInsuranceName: patient.healthInsuranceName,
            healthInsuranceNumber: patient.healthInsuranceNumber,
            information: patient.information,
            nextConsultation: convertDateHours(patient.nextConsultation),
            address: patient.address,
            number: patient.number,
            complement: patient.complement,
            neighborhood: patient.neighborhood,
            state: patient.state,
            postalCode: patient.postalCode.replace(/(\d{5})(\d{3})/, '$1-$2'),
            city: patient.city,
        }
    })

    const onSubmit: SubmitHandler<FormPatient> = (data) => {
        const formattedData: FormPatient = {
            ...data,
            identity: data.identity.replace(/\D/g, ''),
            phone: data.phone.replace(/\D/g, ''),
            postalCode: data.postalCode.replace(/\D/g, ''),
        }

        setIsLoading(true)
        axios.put(`/api/patient/${patient.id}`, formattedData)
        .then(() => {
            toast.success('Paciente atualizado!')
            router.refresh()
            router.push('/')
        })
        .catch(() => toast.error('Algo deu errado!'))
        .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        reset()
    }, [reset])

    const handleGetAddress = useCallback((cep: string) => {
        setValue('address', '')
        setValue('neighborhood', '')
        setValue('city','')
        setValue('state', '')
        
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
        }
    }, [setValue])

    return (
        <Form.Root onSubmit={handleSubmit(onSubmit)}>
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
                <InputTextMask
                    label="CPF"
                    mask="999.999.999-99"
                    disabled={isLoading}
                    {...register("identity", {
                        required: true,
                        maxLength: 14,
                        minLength: 14,
                    })}
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
                    defaultLabel="Selecione um gênero"
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
                    defaultLabel="Selecione uma opção"
                    onChange={(e) => {
                        setValue('healthInsurance', e.target.value)
                        if((e.target.value === 'não')) {
                            setValue('healthInsuranceName', '')
                            setValue('healthInsuranceNumber', '')
                        }
                        if((e.target.value === 'sim')) {
                            setValue('healthInsuranceName', patient.healthInsuranceName || '')
                            setValue('healthInsuranceNumber', patient.healthInsuranceNumber || '')
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
                <InputTextMask
                    label="CEP"
                    mask="99999-999"
                    disabled={isLoading}
                    {...register("postalCode" , { 
                        required: true,
                        maxLength: 9,
                        minLength: 9
                    })}
                    errors={errors.postalCode}
                    onChange={(e) => handleGetAddress(e.target.value)}
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

export default UpdatePatientForm;


export function convertDate(dateString: Date | null) {
    if(!dateString) return ''

    // Creating a Date object with the provided date string
    var date = momentDate(dateString).format('YYYY-MM-DD');

    return date
  
    // // Extracting the relevant parts of the date
    // var year = date.getFullYear();
    // var month = ("0" + (date.getMonth() + 1)).slice(-2); // Adds a leading zero if necessary
    // var day = ("0" + date.getDate()).slice(-2); // Adds a leading zero if necessary

    // // Constructing the date string
    // var formattedDate = year + "-" + month + "-" + day;

    // // Returning the formatted date
    // return formattedDate;
}


export function convertDateHours(dateString: Date | null) {
    if(!dateString) return ''

    // Creating a Date object with the provided date string
    var date = momentDate(dateString).format('YYYY-MM-DD HH:mm');
    return date
  
    // // Extracting the relevant parts of the date
    // var year = date.getFullYear();
    // var month = ("0" + (date.getMonth() + 1)).slice(-2); // Adds a leading zero if necessary
    // var day = ("0" + date.getDate()).slice(-2); // Adds a leading zero if necessary

    // var hours = ("0" + date.getHours()).slice(-2); // Adds a leading zero if necessary
    // var minutes = ("0" + date.getMinutes()).slice(-2); // Adds a leading zero if necessary
    // var seconds = ("0" + date.getSeconds()).slice(-2); // Adds a leading zero if necessary

    // // Constructing the date string
    // var formattedDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes;

    // // Returning the formatted date
    // return formattedDate;
}