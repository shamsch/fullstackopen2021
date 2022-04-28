import diagnose from "../data/diagnoses.json";
import patient from "../data/patients.json";
import {
    diagnoseData,
    patientData,
    patientDataWithoutSsn,
} from "../types/types";

const diagnoseDataArray: diagnoseData[] = diagnose as diagnoseData[];
const patientDataArray: patientData[] = patient as patientData[];

export const getDiagnoseData = (): diagnoseData[] => {
    return diagnoseDataArray;
};

export const getPatientDataWithoutSsn = (): patientDataWithoutSsn[] => {
    return patientDataArray.map(
        ({ id, name, occupation, dateOfBirth, gender }) => ({
            id,
            name,
            occupation,
            dateOfBirth,
            gender,
        })
    );
};
