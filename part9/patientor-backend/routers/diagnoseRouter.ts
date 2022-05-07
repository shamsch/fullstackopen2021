import express from "express";
import { getDiagnoseData } from "../service/getData";

const diagnoseRouter = express.Router(); 

diagnoseRouter.get('/', (_req, _res) =>{
    _res.send(getDiagnoseData());
});

export default diagnoseRouter; 