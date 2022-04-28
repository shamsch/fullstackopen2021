export interface diagnoseData{
    code: string,
    name: string,
    latin: string
}

type Gender = 'male'| 'female';
export interface patientData{
    id: string, 
    name: string, 
    dateOfBirth: string, 
    ssn:string, 
    gender: Gender,
    occupation: string
}

export type  patientDataWithoutSsn = Omit<patientData, 'ssn'>;