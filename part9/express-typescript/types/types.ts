export interface diagnoseData {
    code: string;
    name: string;
    latin: string;
}
interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: string[];
}
export interface patientData {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: genderEnum;
    occupation: string;
    entries: Entry[];
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
      date: string;
      criteria: string;
    };
  }
  
  export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
      startDate: string;
      endDate: string;
    };
  }
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type Entry = HealthCheckEntry| OccupationalHealthcareEntry | HospitalEntry; 

export type patientDataWithoutSsn = Omit<patientData, "ssn" | "entries">;

export enum genderEnum {
    Male = "male",
    Female = "female",
    Other = "other",
}
