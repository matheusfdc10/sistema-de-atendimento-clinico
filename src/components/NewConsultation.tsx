'use client'
import Container from "@/components/Container";
import Title from "@/components/Title";
import RegisterConsultationForm from "@/components/forms/RegisterConsultationForm";
import Input from "@/components/inputs/Input";
import Select, { Option } from "@/components/inputs/Select";
import { Doctor, Patient } from "@prisma/client";
import axios from "axios";
import { useCallback, useState } from "react";
import InputTextMask from "./inputs/InputTextMask";
import { toast } from "react-hot-toast";
import { calculateAge, momentDate } from "@/utils/format";

interface NewConsultationProps {
    doctors: Doctor[] | null
}

const NewConsultation: React.FC<NewConsultationProps> = ({
    doctors
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [doctorId, setDoctorId] = useState('')
    const [patient, setPatient] = useState<Patient | null>(null)
    // const [doctors, setDoctors] = useState<Doctor[] | null>(null)

    const handleGetPatient = useCallback(async (identity: string) => {
        if (identity.length === 11) {
            setIsLoading(true)
            axios.get(`/api/patient/${identity}`)
            .then((response) => response.data)
            .then((data) => {
                setPatient(data)
                !data && toast.error('CPF não encontrado')
            })
            .catch(() => console.log('erro'))
            .finally(() => setIsLoading(false));
        } else {
            setPatient(null)
        }
    }, [])

    // const handleGetDoctor = useCallback(() => {
    //     const headers = {
    //         'Cache-Control': 'no-cache',
    //         'Pragma': 'no-cache',
    //         'Expires': '0',
    //         'x-custom-header': Math.random().toString(), // Valor aleatório para cada requisição
    //       };
    //     setIsLoading(true)
    //     axios.get('/api/obtain/doctors', {
    //         headers
    //     })
    //     .then((response) => console.log(response))
    //     .catch(() => console.log('erro'))
    //     .finally(() => setIsLoading(false))
    // }, [setDoctors])

    // useEffect(() => {
    //     const headers = {
    //         'Cache-Control': 'no-cache',
    //         'Pragma': 'no-cache',
    //         'Expires': '0',
    //         'x-custom-header': Math.random().toString(), // Valor aleatório para cada requisição
    //       };
    //     setIsLoading(true)
    //     axios.get('/api/obtain/doctors', {
    //         headers
    //     })
    //     .then((response) => response.data)
    //     .then((data) => setDoctors(data))
    //     .catch(() => console.log('erro'))
    //     .finally(() => setIsLoading(false))
    // }, [])

    return (
        <Container title="Atendimento ao Paciente">
            <div>
                {/* <button onClick={handleGetDoctor}>click</button> */}
                <Title title="Paciente" />
                <div className="
                    grid 
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                    2xl:grid-cols-5
                    gap-6
                    mt-3
                    mb-9
                ">
                    <InputTextMask
                        label="CPF"
                        mask="999.999.999-99"
                        disabled={isLoading}
                        onChange={(e) => handleGetPatient(e.target.value.replace(/\D/g, ''))}
                    />
                    {patient && (
                        <>
                            <Input
                                label="Nome"
                                disabled
                                value={patient.name}
                            />
                            <Input
                                label="Idade"
                                disabled
                                value={calculateAge(momentDate(patient.birthDate).toDate())}
                            />
                        </>
                    )}
                    {patient?.healthInsuranceName && (
                        <Input
                            label="Plano de saúde"
                            disabled
                            value={patient.healthInsuranceName}
                        />
                    )}
                </div>
            </div>
            <div>
                <Title title="Médico" />
                <div className="
                    grid 
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                    2xl:grid-cols-5
                    gap-6
                    mt-3
                    mb-9
                ">
                    <Select
                        options={selectDoctor(doctors)}
                        label="Dotor"
                        capitalize
                        value={doctorId}
                        disabled={isLoading}
                        onChange={(e) => setDoctorId(e.target.value)}
                        defaultLabel="Selecione um médico"
                    />
                </div>
            </div>
            <RegisterConsultationForm patient={patient} doctorId={doctorId} />
        </Container>
    )
}

export default NewConsultation;









export const selectDoctor = (doctors: Doctor[] | null) => {
    const option: Option[] = []

    doctors?.map((doctor) => {
        option.push({
            label: `${doctor.name.trim()}, ${doctor.specialty.trim()}`,
            value: doctor.id
        })
    })

    return option
}