import getDoctor from "@/actions/getDoctor";
import Container from "@/components/Container"
import UpdateDoctorForm from "@/components/forms/UpdateDoctorForm";
import { redirect } from "next/navigation";

interface IParams {
    doctorId: string;
}

const Doctor = async ({ params }: {params: IParams}) => {
    const doctor = await getDoctor(params.doctorId)
    
    if(!doctor) {
        redirect('/')
    }

    return (
        <Container title={`Médico ${doctor.name}`}>
            <UpdateDoctorForm doctor={doctor} />
        </Container>
    )
}

export default Doctor;