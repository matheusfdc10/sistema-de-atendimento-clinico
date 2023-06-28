import getPatients from "@/actions/getPatient";
import Container from "@/components/Container"
import ListPatient from "@/components/ListPatient";

const Patients = () => {
    return (
        <Container title="Pacientes">
            <ListPatient />
        </Container>
    )
}

export default Patients;