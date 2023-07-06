import prisma from '@/libs/prismadb'
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server'


export async function POST(
    request: Request,
) {
    try {
        const body = await request.json();
        const {
            patientName,
            patientIdentity,
            patientPhone,
            patientEmail,
            patientHealthInsuranceNumber,
            patientNextConsultation,

            doctorId,
            doctorName,
            doctorEmail,
            doctorPhone,
            doctorSpecialty,
            doctorCrm,

            dateTime,
        } = body;
        // const session = await getSession()

        // if (!session?.user?.email) {
        //     return NextResponse.json(null)
        // }
        
        let query: any = {}

        if(doctorId) {
            query.doctorId = doctorId
        }

        if(doctorSpecialty) {
            query.doctor = {
                specialty: {
                    contains: doctorSpecialty,
                    mode:'insensitive',
                }
            }
        }

        if(patientName) {
            query.patient = {
                name: {
                    contains: patientName,
                    mode:'insensitive',
                }
            }
        }

        if(patientIdentity) {
            query.patient = {
                identity: patientIdentity
            }
        }

        if(patientPhone) {
            query.patient = {
                phone: patientPhone
            }
        }

        if(patientEmail) {
            query.patient = {
                email: {
                    contains: patientEmail,
                    mode:'insensitive',
                }
            }
        }

        if(patientHealthInsuranceNumber) {
            query.patient = {
                healthInsuranceNumber: patientHealthInsuranceNumber
            }
        }

        // criar a proxima consulta na tabela consultation ou prescription

        if(dateTime) {
            query.dateTime = new Date(dateTime)
        }

        const consultations = await prisma.consultation.findMany({
            where: query,
            include: {
                patient: true,
                doctor: true,
            },
            orderBy: {
                dateTime: 'desc'
            }
        })

        return NextResponse.json(consultations);
    } catch(error: any) {
        console.log(error)
        return NextResponse.json(null)
    }
}