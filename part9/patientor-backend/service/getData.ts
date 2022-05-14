/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import diagnose from "../data/diagnoses.json";
import patient from "../data/patients";
import {
    diagnoseData,
    genderEnum,
    patientData,
    patientDataWithoutSsn,
    Entry,
    BaseEntry,
    HealthCheckRating,
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
            gender,
        })
    );
};

export const getPatientDatabyID = (keyId: string): patientData | undefined => {
    const patient = patientDataArray.find((ele) => ele.id === keyId);
    if (patient) {
        const patientWithEntry: patientData = { ...patient };
        return patientWithEntry;
    }
    return undefined;
};

// adding

const isString = (text: any): text is string => {
    return typeof text === "string" || text instanceof String;
};

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

//adding entries

const isValidEntryType = (entry: any): entry is Entry => {
    const healthCheck: boolean = entry.type === "HealthCheck";
    const occupationalHealthcare: boolean =
        entry.type === "OccupationalHealthcare";
    const hospital: boolean = entry.type === "Hospital";

    return healthCheck || occupationalHealthcare || hospital;
};

const parseEntry = (entry: any): Entry => {
    console.log(entry);
    if (!entry || !isValidEntryType(entry)) {
        throw new Error("Incorrect or missing entry type: " + entry);
    }

    return entry;
};

const parseDischarge = (discharge: any): { date: string; criteria: string } => {
    if (discharge.date && discharge.criteria) {
        const date = validString(discharge.date);
        const criteria = validString(discharge.criteria);
        return {
            date,
            criteria,
        };
    } else {
        throw new Error("not valid discharge");
    }
};

const parseSickLeave = (
    sickLeave: any
): { startDate: string; endDate: string } => {
    if (sickLeave.startDate && sickLeave.endDate) {
        const startDate = validString(sickLeave.startDate);
        const endDate = validString(sickLeave.endDate);
        return {
            startDate,
            endDate,
        };
    } else {
        throw new Error("not valid discharge");
    }
};

const validDiagnosisCode = (recieveCode: any): string[] | undefined => {
    const code = [recieveCode]; 
    if (code && Array.isArray(code)) {
        const validCodeArray = code.every((item) => isString(item));
        if (validCodeArray) {
            const codeArray = code as string[];
            return codeArray;
        } else {
            throw new Error("invalid Diganosis code");
        }
    } else if (!code) {
        return undefined;
    } else {
        throw new Error("invalid Diganosis code");
    }
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
    if (
        rating === "undefined" ||
        rating === null ||
        !isHealthCheckRating(rating)
    ) {
        throw new Error("Incorrect or missing health check rating: " + rating);
    }
    return rating;
};


export const validateEntry = (data: unknown): Entry => {
    const validEntryType = parseEntry(data);
    if (!validEntryType) {
        throw new Error("Entry not valid");
    }

    const entry: Omit<BaseEntry, "id"> = {
        date: validString(validEntryType.date),
        description: validString(validEntryType.description),
        specialist: validString(validEntryType.specialist),
        diagnosisCodes: validDiagnosisCode(validEntryType.diagnosisCodes),
    };

    const id = uuid();

    switch (validEntryType.type) {
        case "Hospital":
            return {
                ...entry,
                type: validEntryType.type,
                discharge: parseDischarge(validEntryType.discharge),
                id,
            };
        case "HealthCheck":
            return {
                ...entry,
                type: validEntryType.type,
                healthCheckRating: parseHealthCheckRating(
                    validEntryType.healthCheckRating
                ),
                id,
            };
        case "OccupationalHealthcare":
            return {
                ...entry,
                type: validEntryType.type,
                employerName: validString(validEntryType.employerName),
                sickLeave: parseSickLeave(validEntryType.sickLeave),
                id,
            };
        default:
            throw new Error("Could not process entry");
    }
};

export const addEntry = (id: string, entry: Entry) => {
    try {
        const patient = patientDataArray.find((patient) => patient.id === id);
        if (patient) {
            patient.entries.push(entry);
            console.log(patientDataArray.find((patient) => patient.id === id));
        } else {
            throw new Error("can't find patient by id");
        }
    } catch (err) {
        console.log(err);
    }
};
