
import getAllDoctors from "@/actions/getAllDoctor";
import NewConsultation from "@/components/ConsultationPatient";

const PatientConsultation = async () => {
    const doctors = await getAllDoctors();

    return (
        <NewConsultation doctors={doctors} />
    )
}

export default PatientConsultation;













