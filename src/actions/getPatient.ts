import prisma from '@/libs/prismadb'
import getSession from './getSession';

export interface PatientsParams {
    name?: string;
    identity?: string;
    birthDate?: Date;
    gender?: 'masculino' | 'feminino';
    phone?: string;
    email?: string;
    healthInsurance?: boolean;
    nextConsultation?: Date;
}

export default async function getPatient(id: string
    // {
    // name,
    // birthDate,
    // email,
    // gender,
    // identity,
    // healthInsurance,
    // nextConsultation,
    // phone,
    // }: PatientsParams
) {
    try {
        const session = await getSession()
        if (!session?.user?.email) {
            return null
        }

        const patient = prisma.patient.findUnique({
            where: {
                id
            }
        })

        return patient

        // let query: any = {}

        // if(name) {
        //     query.name = name
        // }

        // if(identity) {
        //     query.identity = identity
        // }

        // if(birthDate) {
        //     query.birthDate = birthDate
        // }

        // if(gender) {
        //     query.gender = gender
        // }

        // if(phone) {
        //     query.phone = phone
        // }

        // if(email) {
        //     query.email = email
        // }

        // if(healthInsurance) {
        //     query.healthInsurance = healthInsurance
        // }

        // if(nextConsultation) {
        //     query.nextConsultation = nextConsultation
        // }

        // const patients = await prisma.patient.findMany({
        //     where: query,
        //     orderBy: {
        //         createdAt: 'desc'
        //     }
        // })

        // return patients;
    } catch(error) {
        return null
    }
}