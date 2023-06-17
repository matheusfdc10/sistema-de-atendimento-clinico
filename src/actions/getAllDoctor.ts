import prisma from '@/libs/prismadb'
import getSession from './getSession';

export default async function getAllDoctors() {
    try {

        const session = await getSession()
        console.log('1')
        if (!session?.user?.email) {
            return null
        }

        const allDoctors = await prisma.doctor.findMany()
        console.log('2')
        return allDoctors;
    } catch(error) {
        console.log(error, '3')
        return null
    }
}