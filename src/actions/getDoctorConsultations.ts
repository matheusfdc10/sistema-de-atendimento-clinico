import prisma from '@/libs/prismadb'
import getSession from './getSession';
import { momentDate } from '@/utils/format';

export default async function getDoctorConsultations(doctorId: string) {
    try {
        const session = await getSession()
        if (!session?.user?.email && doctorId) {
            return null
        }

        const moment = momentDate()
        const today = new Date(moment.toDate());

        const consultation = await prisma.consultation.findMany({
            where: {
                doctorId,
                dateTime: {
                    gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString(), // Filtra pela data de hoje ou posterior
                    lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString() // Filtra até o final do dia de hoje
                }
            },
            include: {
                patient: true,
                doctor: true
            },
            orderBy: {
                dateTime: 'asc'
            }
        })
        
        return consultation;
    } catch(error) {
        return null
    }
}