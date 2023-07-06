import { FullConsultationType } from "@/types";
import Table from "./Table";
import { formatTime } from "@/utils/format";
import Link from "next/link";
import { FaNotesMedical } from "react-icons/fa";

interface TableDoctorConsultations {
    consultations: FullConsultationType[]
}

const TableDoctorConsultations: React.FC<TableDoctorConsultations> = ({
    consultations
}) => {
    return (
        <Table.Root>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th scope="coll">Paciente</Table.Th>
                    <Table.Th scope="coll">Horário</Table.Th>
                    <Table.Th scope="coll"></Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {consultations?.map((consultation) => (
                    <Table.Tr key={consultation.id}>
                        <Table.Td>{consultation.patient.name}</Table.Td>
                        <Table.Td>{formatTime(new Date(consultation.dateTime))}</Table.Td>
                        <Table.Td className="w-full">
                            <div className="flex gap-6 justify-center items-center">
                                <Link title="Fixa" href={'/'}>
                                    <FaNotesMedical className="text-2xl text-sky-500 hover:text-sky-600 cursor-pointer"/>
                                </Link>
                            </div>
                        </Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table.Root>
    )
}

export default TableDoctorConsultations;