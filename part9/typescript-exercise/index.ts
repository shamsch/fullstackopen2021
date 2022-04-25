import express from "express";
import { calculateBmi } from "./calculateBmi";

//server running

const app = express();

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (_req, _res) => {
    const { height, weight } = _req.query;
    const heightNum = Number(height);
    const weightNum = Number(weight);
    if (!heightNum || !weightNum) {
        _res.send({
            error: "malformatted parameters",
        });
    }
    const bmi = calculateBmi(heightNum, weightNum);
    _res.send({
        height,
        weight,
        bmi,
    });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
