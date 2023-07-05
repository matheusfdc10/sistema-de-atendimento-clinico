import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function GET(
    request: Request,
) {
    try {
        // const session = await getSession()

        // if (!session?.user?.email) {
        //     // return new NextResponse(null, { status: 401 })
        //     return NextResponse.json(null)
        // }
        const allDoctors = await prisma.doctor.findMany()
        
        return NextResponse.json(allDoctors);
    } catch(error: any) {
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
            specialty,
            crm,
            phone,
            email,
            password
        } = body

        if (!name || !specialty || !crm || !phone || !email) {
            return new NextResponse('Informações ausentes', { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const doctor = await prisma.doctor.create({
            data: {
                name,
                specialty,
                crm,
                phone,
                email,
                user: {
                    create: {
                        email,
                        name,
                        hashedPassword
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