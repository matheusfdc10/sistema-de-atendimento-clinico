import prisma from '@/libs/prismadb'
import getSession from './getSession';

export default async function getConsultation(id: string) {
    try {
        const session = await getSession()
        if (!session?.user?.email && id) {
            return null
        }

        const consultation = await prisma.consultation.findUnique({
            where: {
                id
            },
            include: {
                patient: true,
                doctor: true
            }
        })
        
        return consultation;
    } catch(error) {
        return null
    }
}