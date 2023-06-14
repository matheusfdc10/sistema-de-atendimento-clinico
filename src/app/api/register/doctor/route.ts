import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(
    request: Request
) {
    try {
        const body = await request.json();
        const {
            name,
            specialty,
            crm,
            phone,
            email,
        } = body

        if (!name || !specialty || !crm || !phone || !email) {
            return new NextResponse('Informações ausentes', { status: 400 })
        }

        const doctor = await prisma.doctor.create({
            data: {
                name,
                specialty,
                crm,
                phone,
                email,
            }
        })

        return NextResponse.json(doctor);
    } catch(error: any) {
        console.log(error, 'REGISTRATION_ERROR')
        return new NextResponse('Algo deu errado!', { status: 500 })
    }
}