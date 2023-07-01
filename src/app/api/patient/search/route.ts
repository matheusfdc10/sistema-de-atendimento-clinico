import prisma from '@/libs/prismadb'
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server'


export async function POST(
    request: Request,
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
            healthInsuranceNumber,
            nextConsultation,
        } = body;
        // const session = await getSession()

        // if (!session?.user?.email) {
        //     return NextResponse.json(null)
        // }

        let query: any = {}

        if(name) {
            query.name = {
                // startsWith: name,
                contains: name,
                mode: 'insensitive'
            }
        }

        if(identity) {
            query.identity = identity
        }

        if(birthDate) {
            query.birthDate = birthDate
        }

        if(gender) {
            query.gender = gender
        }

        if(phone) {
            query.phone = phone
        }

        if(email) {
            query.email = email
        }

        if(healthInsuranceNumber) {
            query.healthInsuranceNumber = healthInsuranceNumber
        }

        if(nextConsultation) {
            query.nextConsultation = nextConsultation
        }

        const patient = await prisma.patient.findMany({
            where: query,
            orderBy: {
                updatedAt: 'desc'
            }
        })

        return NextResponse.json(patient);
    } catch(error: any) {
        console.log(error)
        return NextResponse.json(null)
    }
}