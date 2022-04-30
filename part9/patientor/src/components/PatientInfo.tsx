import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";

const PatientInfo = () => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | null>(null);


    useEffect(() => {
        if (id) {
            axios.get<Patient>(`${apiBaseUrl}/patients/${id}`).then((val) => {
                setPatient(val.data);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [id]);
    return (
        <div>
            {patient ? 
            <div> 
                <h3>{patient.name}</h3>
                <p>Gender: {patient.gender} </p>
                <p>SSH: {patient.ssn}</p>
                <p>Occupation: {patient.occupation}</p>
            </div> :
                <p>loading ...</p>}
        </div>
    );
};

export default PatientInfo;