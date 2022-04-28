import express from "express";
import { getAll } from "../service/getData";

const diagnoseRouter = express.Router(); 

diagnoseRouter.get('/', (_req, _res) =>{
    _res.send(getAll());
});

export default diagnoseRouter; 