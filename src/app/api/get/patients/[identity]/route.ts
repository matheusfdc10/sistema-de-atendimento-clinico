import getPatient from '@/actions/getPatient';
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

        if (!identity) {
            return NextResponse.json(null)
        }

        const patient = await getPatient(identity)

        return NextResponse.json(patient);
    } catch(error: any) {
        console.log(error, 'ERROR')
        return NextResponse.json(null)
    }
}