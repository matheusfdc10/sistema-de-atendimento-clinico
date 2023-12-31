import prisma from '@/libs/prismadb'
import { formatDateTime, momentDate } from '@/utils/format';
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server'

interface IParams {
    consultationId: string;
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
        const { consultationId } = params;
        const body = await request.json();
        const {
            doctorId,
            dateTime,
            healthInsuranceName,
            healthInsuranceNumber,
            diagnosis,
            treatment,
            amountPaid,
        } = body
        
        const consultation = await prisma.consultation.update({
            where: {
                id: consultationId
            },
            data: {
                doctorId,
                dateTime: momentDate(dateTime).toDate(),
                healthInsuranceName,
                healthInsuranceNumber,
                diagnosis,
                treatment,
                amountPaid,
            }
        })

        return NextResponse.json(consultation);
    } catch(error: any) {
        console.log(error)
        return new NextResponse('Algo deu errado!', { status: 500 })
    }
}