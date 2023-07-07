'use client'
import { FullConsultationType } from "@/types";
import Form from "./Form";
import Input from "./inputs/Input";
import Textarea from "./inputs/Textarea";
import Title from "./Title";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormPatient } from "./forms/RegisterPatientForm";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Button from "./buttons/Button";

interface DoctorConsultationProps {
    consultation: FullConsultationType;
}

const DoctorConsultation: React.FC<DoctorConsultationProps> = ({
    consultation
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

        }
    })

    const onSubmit: SubmitHandler<FormPatient> = (data) => {
        const formattedData: FormPatient = {
            ...data,
            // identity: data.identity.replace(/\D/g, ''),
            // phone: data.phone.replace(/\D/g, ''),
            // postalCode: data.postalCode.replace(/\D/g, ''),
        }

        // setIsLoading(true)
        // axios.put(`/api/doct`, formattedData)
        // .then(() => {
        //     toast.success('Cadastrado com sucesso!')
        //     router.refresh()
        //     router.push('/')
        // })
        // .catch(() => toast.error('Algo deu errado!'))
        // .finally(() => setIsLoading(false))
    }

    return (
        <Form.Root onSubmit={handleSubmit(onSubmit)} >
            {consultation.patient?.information && (
                <Textarea
                    label="Observações do paciente"
                    disabled
                    value={consultation.patient?.information}
                />
            )}
            <Title title="Prescrição Médica" />
            <Textarea
                label="Diagnóstico"
            />
            <Textarea
                label="Tratamento"
            />
            <Form.Container>
                <Input
                    label="Medicamento"
                />
                <Input
                    label="Dosagem"
                />
                <Input
                    label="Frequência"
                />
            </Form.Container>
            <div className="flex justify-end">
                <Button>
                    Add medicamento
                </Button>
            </div>
            <Textarea 
                label="Instrução"
            />
            <Form.ContainerActions>
                <Button>
                    Cadastrar
                </Button>
            </Form.ContainerActions>
        </Form.Root>
    )
}

export default DoctorConsultation;