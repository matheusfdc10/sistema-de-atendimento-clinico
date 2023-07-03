import getAllDoctors from "@/actions/getAllDoctor";
import Container from "@/components/Container"
import SearchConsultation from "@/components/SearchConsultation";

const Consultations = async () => {
    const doctors = await getAllDoctors();

    return (
        <Container title="Atendimentos">
            <SearchConsultation doctors={doctors} />
        </Container>
    )
}

export default Consultations;