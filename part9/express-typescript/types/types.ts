export interface diagnoseData{
    code: string,
    name: string,
    latin: string
}

export enum genderEnum {
    M = "male",
    F = "female",
    O = "other"
}
export interface patientData{
    id: string, 
    name: string, 
    dateOfBirth: string, 
    ssn:string, 
    gender: genderEnum,
    occupation: string
}

export type  patientDataWithoutSsn = Omit<patientData, 'ssn'>;

export enum genderEnum {
    male = "male",
    female = "female",
    other = "other"
}