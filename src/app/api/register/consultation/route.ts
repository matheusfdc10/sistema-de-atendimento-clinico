import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(
    request: Request
) {
    try {
        const body = await request.json();
        const {
            patientId,
            doctorId,
            dateTime,
            healthInsuranceName,
            healthInsuranceNumber,
            diagnosis,
            treatment,
            amountPaid,
        } = body;

        const consultation = await prisma.consultation.create({
            data: {
                patientId,
                doctorId,
                healthInsuranceName,
                healthInsuranceNumber,
                diagnosis,
                treatment,
                amountPaid,
                dateTime: new Date(dateTime)
            }
        })

        return NextResponse.json(consultation);
    } catch(error: any) {
        console.log(error, 'REGISTRATION_ERROR')
        return new NextResponse('Algo deu errado!', { status: 500 })
    }
}