import diagnose from "../data/diagnoses.json";
import { diagnoseData } from "../types/types";

const diagnoseDataArray: diagnoseData[] = diagnose as diagnoseData[];

export const getAll = (): diagnoseData[] => {
    return diagnoseDataArray;
};

