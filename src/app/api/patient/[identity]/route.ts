import prisma from '@/libs/prismadb'
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server'

interface IParams {
    identity: string;
}
  
export async function GET(
    request: Request,
  { params }: { params: IParams }
) {
    try {
        const { identity } = params;
        // const session = await getSession()

        // if (!session?.user?.email && !identity) {
        //     return NextResponse.json(null)
        // }

        const patient = await prisma.patient.findUnique({
            where: {
                identity
            }
        })

        return NextResponse.json(patient);
    } catch(error: any) {
        console.log(error)
        return NextResponse.json(null)
    }
}