import getAllDoctors from '@/actions/getAllDoctor';
import { NextResponse } from 'next/server'
  

export async function GET(
    request: Request,
) {
    try {
        
        const allDoctors = await getAllDoctors()

        return NextResponse.json(allDoctors);
    } catch(error: any) {
        console.log(error, 'ERROR')
        return NextResponse.json(null)
    }
}