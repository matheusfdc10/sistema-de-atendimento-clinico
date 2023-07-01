import prisma from '@/libs/prismadb'
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server'

interface IParams {
    identityId: string;
}
  
export async function GET(
    request: Request,
  { params }: { params: IParams }
) {
    try {
        const { identityId } = params;
        // const session = await getSession()

        // if (!session?.user?.email && !identity) {
        //     return NextResponse.json(null)
        // }

        const patient = await prisma.patient.findUnique({
            where: {
                identity: identityId
            }
        })

        return NextResponse.json(patient);
    } catch(error: any) {
        console.log(error)
        return NextResponse.json(null)
    }
}


export async function PUT(
    request: Request,
  { params }: { params: IParams }
) {
    try {
        // const session = await getSession()
        
        // if (!session?.user?.email && !identity) {
        //     return NextResponse.json(null)
        // }
        const { identityId } = params;
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

        const patient = await prisma.patient.update({
            where: {
                id: identityId
            },
            data: {
                name,
                identity,
                birthDate: new Date(birthDate),
                gender,
                phone,
                email,
                healthInsurance: healthInsurance === 'sim' ? true : false,
                healthInsuranceName: healthInsurance === 'sim' ? healthInsuranceName : '',
                healthInsuranceNumber: healthInsurance === 'sim' ? healthInsuranceNumber : '',
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
        console.log(error)
        return NextResponse.json(null)
    }
}