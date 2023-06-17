import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'
  

export async function GET(
    request: Request,
) {
    try {
        
        console.log('4')
        const allDoctors = await prisma.doctor.findMany()
        console.log(allDoctors)
        return NextResponse.json(allDoctors);
    } catch(error: any) {
        console.log(error, 'ERROR')
        return NextResponse.json(null)
    }
}