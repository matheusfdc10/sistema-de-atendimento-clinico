import { Consultation, Doctor, Patient, Prescription } from "@prisma/client";

export type FullConsultationType = Consultation & {
    patient: Patient,
    doctor: Doctor,
}

export type FullPrescriptionType = Consultation & {
    prescription: Prescription
}