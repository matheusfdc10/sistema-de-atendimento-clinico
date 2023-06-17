import prisma from '@/libs/prismadb'
import getSession from './getSession';

export default async function getAllDoctors() {
    try {
        
        const session = await getSession()

        if (!session?.user?.email) {
            return null
        }

        const allDoctors = await prisma.doctor.findMany()

        return allDoctors;
    } catch(error) {
        return null
    }
}