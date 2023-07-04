
import getAllDoctors from "@/actions/getAllDoctor";
import getConsultation from "@/actions/getConsultation";
import Container from "@/components/Container"
import UpdateConsultationForm from "@/components/forms/UpdateConsultationForm";
import { redirect } from "next/navigation";

interface IParams {
    consultationId: string;
}

const Consultation = async ({ params }: {params: IParams}) => {
    const consultation = await getConsultation(params.consultationId)
    const doctors = await getAllDoctors();
    
    if(!consultation || !doctors) {
        redirect('/')
    }

    return (
        <Container title={`Atendimento`}>
            <UpdateConsultationForm consultation={consultation} doctors={doctors} />
        </Container>
    )
}

export default Consultation;