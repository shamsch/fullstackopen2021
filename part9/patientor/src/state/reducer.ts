import { State } from "./state";
import { Patient } from "../types";

export type Action =
    | {
          type: "SET_PATIENT_LIST";
          payload: Patient[];
      }
    | {
          type: "ADD_PATIENT";
          payload: Patient;
      }
    | {
          type: "PATIENT_VIEW";
          payload: Patient;
      };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_PATIENT_LIST":
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        (memo, patient) => ({ ...memo, [patient.id]: patient }),
                        {}
                    ),
                    ...state.patients,
                },
            };
        case "ADD_PATIENT":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload,
                },
            };
        case "PATIENT_VIEW":
            return {
                ...state,
                patient: action.payload,
            };
        default:
            return state;
    }
};

//action creator

export const setPatientList = (list: Patient[]): Action => {
    return { payload: list, type: "SET_PATIENT_LIST" };
};

export const setPatientView = (list: Patient): Action => {
  return { payload: list, type: "PATIENT_VIEW" };
};

export const setPatient = (list: Patient): Action => {
  return { payload: list, type: "ADD_PATIENT" };
};