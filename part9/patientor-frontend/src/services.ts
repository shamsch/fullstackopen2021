import axios from "axios";
import { apiBaseUrl } from "./constants";
import { Action, setDiagnoses, setPatientList } from "./state";
import { Diagnosis, Patient } from "./types";



export const fetchPatientList = async (dispatch: React.Dispatch<Action>) => {
    try {
      const { data: patientListFromApi } = await axios.get<Patient[]>(
        `${apiBaseUrl}/patients`
      );
      const {data: diagnoses} = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnose`);
      dispatch(setDiagnoses(diagnoses));
      dispatch(setPatientList(patientListFromApi));
    } catch (e) {
      console.error(e);
    }
};


