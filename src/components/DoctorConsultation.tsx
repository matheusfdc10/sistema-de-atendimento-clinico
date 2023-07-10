'use client'
import { FullConsultationType } from "@/types";
import Form from "./Form";
import Input from "./inputs/Input";
import Textarea from "./inputs/Textarea";
import Title from "./Title";
import { FieldValues , SubmitHandler, useFieldArray, useForm } from "react-hook-form";
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
        control,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            diagnosis: consultation.diagnosis,
            treatment: consultation.treatment,
            instructions: '',
            medications: [{
                name: '',
                dosage: '',
                frequency: '',
            }]
        }
    })
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'medications'
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post(`/api/prescription/${consultation.id}`, data)
        .then(() => {
            toast.success('Cadastrado com sucesso!')
            router.refresh()
            router.push('/')
        })
        .catch(() => toast.error('Algo deu errado!'))
        .finally(() => setIsLoading(false))
    }

    const addField = () => {
        append({
            name: '',
            dosage: '',
            frequency: '',
        })
    };

    const deleteField = (indice: number) => {
        remove(indice)
    };

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
                {...register('diagnosis', { required: true })}
                errors={errors.diagnosis}
                disabled={isLoading}
            />
            <Textarea
                label="Tratamento"
                {...register('treatment', { required: true })}
                errors={errors.treatment}
                disabled={isLoading}
            />
            {fields.map((campo, i) => (
                <Form.Container key={i}>
                    <Input
                        label="Medicamento"
                        {...register(`medications.${i}.name`, { required: true})}
                        disabled={isLoading}
                        errors={errors.medications}
                    />
                    <Input
                        label="Dosagem"
                        {...register(`medications.${i}.dosage`, { required: true})}
                        disabled={isLoading}
                        errors={errors.medications}
                    />
                    <Input
                        label="Frequência"
                        {...register(`medications.${i}.frequency`, { required: true})}
                        disabled={isLoading}
                        errors={errors.medications}
                    />
                    <div className="self-center">
                        <Button onClick={() => deleteField(i)}>Excluir</Button>
                    </div>
                </Form.Container>
            ))}
            <div className="flex justify-end">
                <Button onClick={addField}>
                    Add medicamento
                </Button>
            </div>
            <Textarea 
                label="Instrução"
                {...register('instructions', { required: true })}
                errors={errors.instructions}
                disabled={isLoading}
            />
            <Form.ContainerActions>
                <Button 
                    type="submit"
                    disabled={isLoading}
                >
                    Cadastrar
                </Button>
            </Form.ContainerActions>
        </Form.Root>
    )
}

export default DoctorConsultation;