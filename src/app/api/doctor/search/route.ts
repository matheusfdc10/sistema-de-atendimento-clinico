import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'


export async function POST(
    request: Request,
) {
    try {
        const body = await request.json();
        
        const {
            name,
            crm,
            specialty,
            phone,
            email,
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

        if(crm) {
            query.crm = crm
        }

        if(phone) {
            query.phone = phone
        }

        if(email) {
            query.email = {
                contains: email,
                mode: 'insensitive'
            }
        }

        if(specialty) {
            query.specialty = {
                contains: specialty,
                mode: 'insensitive'
            }
        }

        const doctoes = await prisma.doctor.findMany({
            where: query,
            orderBy: {
                updatedAt: 'desc'
            }
        })

        return NextResponse.json(doctoes);
    } catch(error: any) {
        console.log(error)
        return NextResponse.json(null)
    }
}