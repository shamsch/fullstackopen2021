import express from "express";
import {
    addEntry,
    addPatient,
    getPatientDatabyID,
    getPatientDataWithoutSsn,
    validateEntry,
} from "../service/getData";
import { Entry, patientData } from "../types/types";
import { validateData } from "../service/getData";

const patientRouter = express.Router();

patientRouter.get("/", (_req, _res) => {
    _res.send(getPatientDataWithoutSsn());
});

patientRouter.post("/", (_req, _res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = _req.body;
    console.log(body);
    try {
        const validEntry: patientData = validateData(body);
        addPatient(validEntry);
        _res.send(validEntry);
    } catch (error: unknown) {
        console.log(error);
        _res.send(error);
    }
});

patientRouter.get("/:id", (_req, _res) => {
    const { id } = _req.params;
    _res.send(getPatientDatabyID(id));
});

patientRouter.post("/:id/entries", (_req, _res) => {
    const { id } = _req.params;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = _req.body;
    try {
        const validEntry: Entry = validateEntry(body);
        addEntry(id,validEntry);
        _res.send(validEntry);
    } catch (error) {
        console.log(error);
        _res.send(error);
    }
});

export default patientRouter;
