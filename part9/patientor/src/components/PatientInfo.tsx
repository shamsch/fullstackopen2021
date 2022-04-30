import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { setPatientView, useStateValue } from "../state";
import { Patient } from "../types";

const PatientInfo = () => {
    const { id } = useParams<{ id: string }>();
    const [{patient}, dispatch] = useStateValue();


    useEffect(() => {
        if (id) {
            if (patient && id===patient.id){
                console.log("Already has patient");
            }
            else{
                axios.get<Patient>(`${apiBaseUrl}/patients/${id}`).then((val) => {
                    dispatch(setPatientView(val.data));
                }).catch((error) => {
                    console.log(error);
                });
            }
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