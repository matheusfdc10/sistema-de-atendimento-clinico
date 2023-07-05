import prisma from '@/libs/prismadb'
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server'

interface IParams {
    doctorId: string;
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
        const { doctorId } = params;
        const body = await request.json();
        const {
            name,
            specialty,
            crm,
            email,
            phone
        } = body

        const doctor = await prisma.doctor.update({
            where: {
                id: doctorId
            },
            data: {
                name,
                specialty,
                crm,
                email,
                phone,
                user: {
                    update: {
                        email
                    }
                }
            }
        })

        return NextResponse.json(doctor);
    } catch(error: any) {
        console.log(error)
        return new NextResponse('Algo deu errado!', { status: 500 })
    }
}