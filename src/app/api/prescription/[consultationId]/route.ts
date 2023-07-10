import getSession from '@/actions/getSession';
import prisma from '@/libs/prismadb'
import { FullPrescriptionType } from '@/types';
import { NextResponse } from 'next/server'

interface IParams {
    consultationId: string;
}

type MedicationType = {
    name: string;
    dosage: string;
    frequency: string;
}

type PresciptionType = {
    diagnosis: string;
    treatment: string;
    instructions: string;
    medications: MedicationType[],
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const { consultationId } = params;
        const body: PresciptionType = await request.json();
        const {
            diagnosis,
            treatment,
            instructions,
            medications,
        } = body;

        const consultation = await prisma.consultation.update({
            where: {
                id: consultationId
            },
            data: {
                diagnosis,
                treatment,
                concluded: true,
                prescriptions: {
                    create: {
                        instructions,
                        medications: {
                            create: medications.map(medication => {
                                return {
                                    name: medication.name,
                                    dosage: medication.dosage,
                                    frequency: medication.frequency
                                }
                            })
                        }
                    }
                }
            }
        })

        return NextResponse.json(consultation);
    } catch(error: any) {
        console.log(error)
        return new NextResponse('Algo deu errado!', { status: 500 })
    }
}