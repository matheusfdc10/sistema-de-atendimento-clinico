import getCurrentUser from '@/actions/getCurrentUser';
import getDoctorConsultations from '@/actions/getDoctorConsultations';
import Container from '@/components/Container';
import TableDoctorConsultations from '@/components/TableDoctorConsultations';

const Home = async () => {
    const currentUser = await getCurrentUser()

    if ( currentUser?.role === 'ADMIN') {
        
    }

    if (currentUser?.role === 'DOCTOR') {
        const doctorConsultations = await getDoctorConsultations(currentUser.doctorId!)

        return (
            <Container title='Sistema de Atendimento Clínico'>
                {(currentUser?.role === 'DOCTOR' && !!doctorConsultations?.length) && (
                    <TableDoctorConsultations consultations={doctorConsultations} />
                )}
            </Container>
        )
    }

    return (
        <Container title='Sistema de Atendimento Clínico'>
            
        </Container>
    )
}

export default Home;