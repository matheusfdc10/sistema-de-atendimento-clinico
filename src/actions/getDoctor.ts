import prisma from '@/libs/prismadb'
import getSession from './getSession';

export default async function getDoctor(id: string) {
    try {
        const session = await getSession()
        if (!session?.user?.email && id) {
            return null
        }

        const Doctor = await prisma.doctor.findUnique({
            where: {
                id
            }
        })
        
        return Doctor;
    } catch(error) {
        return null
    }
}