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
    occupation: string,
    entries:Entry[]
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export type  patientDataWithoutSsn = Omit<patientData, 'ssn' | 'entries'>;

export enum genderEnum {
    male = "male",
    female = "female",
    other = "other"
}