import prisma from '@/libs/prismadb'
import getSession from './getSession';

export default async function getPatient(identity: string) {
    try {
        const session = await getSession()

        if (!session?.user?.email && !identity) {
            return null
        }

        const patient = await prisma.patient.findUnique({
            where: {
                identity
            }
        })

        return patient;
    } catch(error) {
        return null
    }
}