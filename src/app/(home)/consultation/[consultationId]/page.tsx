
import getAllDoctors from "@/actions/getAllDoctor";
import getConsultation from "@/actions/getConsultation";
import getCurrentUser from "@/actions/getCurrentUser";
import Container from "@/components/Container"
import DoctorConsultation from "@/components/DoctorConsultation";
import UpdateConsultationForm from "@/components/forms/UpdateConsultationForm";
import { calculateAge } from "@/utils/format";
import { redirect } from "next/navigation";

interface IParams {
    consultationId: string;
}

const Consultation = async ({ params }: {params: IParams}) => {
    const currentUser = await getCurrentUser()
    const consultation = await getConsultation(params.consultationId)

    if(!consultation) {
        redirect('/')
    }

    if(currentUser?.role === 'ADMIN') {
        const doctors = await getAllDoctors();
        
        if(!doctors) {
            redirect('/')
        }
    
        return (
            <Container title={`Atendimento`}>
                <UpdateConsultationForm consultation={consultation} doctors={doctors} />
            </Container>
        )
    }

    return (
        <Container title={`Paciente ${consultation.patient.name} ${calculateAge(consultation.patient.birthDate)}`}>
            <DoctorConsultation consultation={consultation} /> 
        </Container>
    )
}

export default Consultation;