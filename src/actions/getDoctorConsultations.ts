import prisma from '@/libs/prismadb'
import getSession from './getSession';
import { momentDate } from '@/utils/format';

export default async function getDoctorConsultations(doctorId: string) {
    try {
        const session = await getSession()
        if (!session?.user?.email && doctorId) {
            return null
        }

        const consultation = await prisma.consultation.findMany({
            where: {
                doctorId,
                concluded: false,
                dateTime: {
                    gte: momentDate(momentDate().format('YYYY-MM-DD')).toDate(), // Filtra pela data de hoje ou posterior
                    lt: momentDate(momentDate().add(1, 'day').format('YYYY-MM-DD')).toDate() // Filtra até o final do dia de hoje
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