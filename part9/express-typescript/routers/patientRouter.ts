import express from "express";
import { getPatientDataWithoutSsn } from "../service/getData";

const patientRouter = express.Router();

patientRouter.get("/", (_req, _res) => {
    _res.send(getPatientDataWithoutSsn());
});

export default patientRouter;
