import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { fetchPatientList } from "../services";
import { setPatientView, useStateValue } from "../state";
import { Patient, Diagnosis } from "../types";
import AddEntry from "./AddEntry";

const PatientInfo = () => {
    const { id } = useParams<{ id: string }>();
    const [{ diagnoses }] = useStateValue();
    const [{ patient }, dispatch] = useStateValue();


    const getDignoseName = (code: Diagnosis["code"]) => {
        if(diagnoses){
            const diagnosis = diagnoses.filter((ele) => ele.code === code);
            return diagnosis[0].name;
        }
        return " ";
    };

    const listDiagnoseCode = (codeList: string[] | undefined): JSX.Element => {
        if (codeList) {
            return (<ul> {codeList.map((ele, index) => <li key={index}>{ele} {getDignoseName(ele)}</li>)} </ul>);
        }
        return <></>;

    };

    useEffect(() => {
        fetchPatientList(dispatch).then(()=> {
            if (id) {
                if (patient && id === patient.id) {
                    console.log("Already has patient");
                }
                else {
                    
                    axios.get<Patient>(`${apiBaseUrl}/patients/${id}`).then((val) => {
                        dispatch(setPatientView(val.data));
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            }
        }).catch((e)=>{
            console.log(e);
        });

       
    }, [id]);

   
    
    return (
        <div>
            {patient ?
                <div>
                    <h3>{patient.name}</h3>
                    <p>Gender: {patient.gender} </p>
                    <p>SSH: {patient.ssn}</p>
                    <p>Occupation: {patient.occupation}</p>
                    <h4>Entries</h4>
                    {patient.entries.map((entry) => <div key={entry.id}><p>{entry.date} {entry.description}</p> {listDiagnoseCode(entry.diagnosisCodes)}</div>)}
                    <AddEntry/>
                </div> :
                <p>loading ...</p>}
        </div>
    );
};

export default PatientInfo;