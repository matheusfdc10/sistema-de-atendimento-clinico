import getPatient from "@/actions/getPatient";
import Container from "@/components/Container"

interface IParams {
    patientId: string;
}

const Patient = async ({ params }: {params: IParams}) => {
    const patient = await getPatient(params.patientId)

    return (
        <Container title={`Paciente ${patient?.name}`}>

        </Container>
    )
}

export default Patient;