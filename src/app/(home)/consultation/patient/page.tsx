'use client'
import Container from "@/components/Container";
import Title from "@/components/Title";
import ConsultationPatientForm from "@/components/forms/ConsultationPatientForm";
import Input from "@/components/inputs/Input";
import Select, { Option } from "@/components/inputs/Select";
import { Doctor, Patient } from "@prisma/client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const PatientConsultation = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [doctorId, setDoctorId] = useState('')
    const [patient, setPatient] = useState<Patient | null>(null)
    const [doctors, setDoctors] = useState<Doctor[] | null>(null)

    const handleGetPatient = useCallback(async (identity: string) => {
        if (identity.length === 11) {
            setIsLoading(true)
            axios.get(`/api/obtain/patients/${identity}`)
            .then((response) => response.data)
            .then((data) => setPatient(data))
            .catch(() => console.log('erro'))
            .finally(() => setIsLoading(false));
        } else {
            setPatient(null)
        }
    }, [])

    const handleGetDoctor = useCallback(async () => {
        setIsLoading(true)
        axios.get('/api/obtain/doctors', )
        .then((response) => response.data)
        .then((data) => setDoctors(data))
        .catch(() => console.log('erro'))
        .finally(() => setIsLoading(false))
    }, [])

    useEffect(() => {
        handleGetDoctor()
    }, [handleGetDoctor])

    return (
        <Container title="Atendimento ao Paciente">
            <div>
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
                    <Input
                        label="CPF"
                        disabled={isLoading}
                        onChange={(e) => handleGetPatient(e.target.value)}
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
                                value={calculateAge(new Date(patient.birthDate)) + ' anos'}
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
                        placeholder="ola"
                        label="Dotor"
                        capitalize
                        value={doctorId}
                        disabled={isLoading}
                        onChange={(e) => setDoctorId(e.target.value)}
                    />
                </div>
            </div>
            <ConsultationPatientForm patient={patient} doctorId={doctorId} />
        </Container>
    )
}

export default PatientConsultation;













const selectDoctor = (doctors: Doctor[] | null) => {
    const option: Option[] = []

    doctors?.map((doctor) => {
        option.push({
            label: `${doctor.name.trim()}, ${doctor.specialty.trim()}`,
            value: doctor.id
        })
    })

    return option
}



function calculateAge(dateOfBirth: Date): number {
    const currentDate: Date = new Date();
    const currentYear: number = currentDate.getFullYear();
    const birthYear: number = dateOfBirth.getFullYear();
  
    let age: number = currentYear - birthYear;
  
    const currentMonth: number = currentDate.getMonth();
    const birthMonth: number = dateOfBirth.getMonth();
  
    // Check if the birth month and day have already occurred in the current year
    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate.getDate() < dateOfBirth.getDate())) {
      age--;
    }
  
    return age;
  }