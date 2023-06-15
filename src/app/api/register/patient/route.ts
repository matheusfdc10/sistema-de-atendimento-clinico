import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(
    request: Request
) {
    try {
        const body = await request.json();
        const {
            name,
            identity,
            birthDate,
            gender,
            phone,
            email,
            healthInsurance,
            healthInsuranceName,
            healthInsuranceNumber,
            information,
            nextConsultation,
            address,
            number,
            complement,
            neighborhood,
            state,
            postalCode,
            city,
        } = body;

        const patient = await prisma.patient.create({
            data: {
                name,
                identity,
                birthDate: new Date(birthDate),
                gender,
                phone,
                email,
                healthInsurance: healthInsurance === 'true' ? true : false,
                healthInsuranceName,
                healthInsuranceNumber,
                information,
                nextConsultation: nextConsultation ? new Date(nextConsultation) : null,
                address,
                number,
                complement,
                neighborhood,
                state,
                postalCode,
                city,
            }
        })

        return NextResponse.json(patient);
    } catch(error: any) {
        console.log(error, 'REGISTRATION_ERROR')
        return new NextResponse('Algo deu errado!', { status: 500 })
    }
}