import getPatients from "@/actions/getPatient";
import Container from "@/components/Container"
import SearchPatients from "@/components/SearchPatients";

const Patients = () => {
    return (
        <Container title="Pacientes">
            <SearchPatients />
        </Container>
    )
}

export default Patients;