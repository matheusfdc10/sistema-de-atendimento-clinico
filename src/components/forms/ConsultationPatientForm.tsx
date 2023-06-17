'use client'

import axios from "axios"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import DropdownSelectMenu from "../DropdownSelectMenu"
import Button from "../buttons/Button"
import Input from "../inputs/Input"
import { Patient } from "@prisma/client"
import Textarea from "../inputs/Textarea"

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
    }, [doctorId, patient])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('/api/register/consultation', data)
        .then(() => {
            toast.success('Atendimento cadastrado!')
            router.push('/')
        })
        .catch(() => toast.error('Algo deu errado!'))
        .finally(() => setIsLoading(false))
    }

    return (
        <> 
            {doctorId && patient && (
                <form 
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex-1 flex flex-col justify-between gap-9"
                >
                    <div>
                        <Textarea
                            label="Diagnóstico"
                            disabled={isLoading}
                            {...register("diagnosis" , { required: false })}
                            errors={errors?.diagnosis}
                        />
                    </div>
                    <div>
                        <Textarea
                            label="Tratamento"
                            disabled={isLoading}
                            {...register("treatment" , { required: false })}
                            errors={errors?.treatment}
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
            )}
        </>
    )
}

export default ConsultationPatientForm;