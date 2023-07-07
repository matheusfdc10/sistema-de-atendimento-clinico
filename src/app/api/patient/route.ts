import prisma from '@/libs/prismadb'
import { momentDate } from '@/utils/format';
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server'

export async function GET(
    request: Request,
) {
    try {
        const session = await getSession()

        if (!session?.user?.email) {
            return NextResponse.json(null)
        }

        const patients = await prisma.patient.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(patients);
    } catch(error: any) {
        console.log(error)
        return NextResponse.json(null)
    }
}


export async function POST(
    request: Request
) {
    try {
        // const session = await getSession()

        // if (!session?.user?.email) {
        //     // return new NextResponse(null, { status: 401 })
        //     return NextResponse.json(null)
        // }
        
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
                birthDate: momentDate(birthDate).toDate(),
                gender,
                phone,
                email,
                healthInsurance: healthInsurance === 'sim' ? true : false,
                healthInsuranceName: healthInsurance === 'sim' ? healthInsuranceName : '',
                healthInsuranceNumber: healthInsurance === 'sim' ? healthInsuranceNumber : '',
                information,
                nextConsultation: nextConsultation ? momentDate(nextConsultation).toDate() : null,
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
        console.log(error)
        return new NextResponse('Algo deu errado!', { status: 500 })
    }
}