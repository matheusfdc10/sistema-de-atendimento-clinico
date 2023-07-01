import getPatient from "@/actions/getPatient";
import Container from "@/components/Container"
import UpdatePatientForm from "@/components/forms/UpdatePatientForm";

interface IParams {
    patientId: string;
}

const Patient = async ({ params }: {params: IParams}) => {
    const patient = await getPatient(params.patientId)

    return (
        <Container title={`Paciente ${patient?.name}`}>
            <UpdatePatientForm patient={patient!} />
        </Container>
    )
}

export default Patient;