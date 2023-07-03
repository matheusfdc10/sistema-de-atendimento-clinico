import { Consultation, Doctor, Patient } from "@prisma/client";

export type FullConsultationType = Consultation & {
    patient: Patient,
    doctor: Doctor,
}