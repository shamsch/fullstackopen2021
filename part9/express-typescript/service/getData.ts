import diagnose from "../data/diagnoses.json";
import patient from "../data/patients";
import {
    diagnoseData,
    genderEnum,
    patientData,
    patientDataWithoutSsn,
    Entry,
} from "../types/types";
import { v1 as uuid } from "uuid";

const diagnoseDataArray: diagnoseData[] = diagnose as diagnoseData[];
const patientDataArray: patientData[] = patient;

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
            gender
        })
    );
};

export const getPatientDatabyID = (
    keyId: string
): patientData | undefined => {
    const patient = patientDataArray.find((ele) => ele.id === keyId);
    if(patient){
        const patientWithEntry:patientData = {...patient};
        return patientWithEntry; 
    }
    return undefined;
};

// adding
const validString = (str: unknown): string => {
    if (typeof str === "string") {
        return str;
    } else {
        return "";
    }
};

const isGender = (text: any): text is genderEnum => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(genderEnum).includes(text);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validGender = (gender: any): genderEnum => {
    if (isGender(gender)) {
        return gender;
    }
    return genderEnum["Other"];
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateData = (data: any) => {
    const name = validString(data.name);
    const id = uuid();
    const dateOfBirth = validString(data.dateOfBirth);
    const occupation = validString(data.occupation);
    const ssn = validString(data.ssn);
    const gender = validGender(data.gender);
    const entries: Entry[] = [];

    console.log(data.entries);

    const validData: patientData = {
        id,
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
        entries,
    };

    return validData;
};

export const addPatient = (patient: patientData) => {
    patientDataArray.push(patient);
};
