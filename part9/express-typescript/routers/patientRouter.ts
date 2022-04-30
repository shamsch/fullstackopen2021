import express from "express";
import { addPatient, getPatientDatabyID, getPatientDataWithoutSsn } from "../service/getData";
import { patientData } from "../types/types";
import { validateData } from "../service/getData";

const patientRouter = express.Router();

patientRouter.get("/", (_req, _res) => {
    _res.send(getPatientDataWithoutSsn());
});

patientRouter.post("/", (_req, _res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = _req.body;
    try {
        const validEntry: patientData = validateData(body);
        addPatient(validEntry);
        _res.send(validEntry);
    } catch (error: unknown) {
        console.log(error);
        _res.send(error);
    }
});

patientRouter.get("/:id", (_req,_res) =>{
    const {id} = _req.params;
    _res.send(getPatientDatabyID(id));
});

export default patientRouter;
