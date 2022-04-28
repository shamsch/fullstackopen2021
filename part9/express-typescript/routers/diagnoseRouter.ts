import express from "express";
import { getAll } from "../service/getData";

const router = express.Router(); 

router.get('/', (_req, _res) =>{
    _res.send(getAll());
});

export default router; 