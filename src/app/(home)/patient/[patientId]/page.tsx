import getPatient from "@/actions/getPatient";
import Container from "@/components/Container"
import UpdatePatientForm from "@/components/forms/UpdatePatientForm";
import { redirect } from "next/navigation";

interface IParams {
    patientId: string;
}

const Patient = async ({ params }: {params: IParams}) => {
    const patient = await getPatient(params.patientId)

    if(!patient) {
        redirect('/')
    }

    return (
        <Container title={`Paciente ${patient?.name}`}>
            <UpdatePatientForm patient={patient!} />
        </Container>
    )
}

export default Patient;