import express from "express";
import { calculateBmi } from "./calculateBmi";
import { calculateExercise } from "./exerciseCalculator";

//server running

const app = express();

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.use(express.json());

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

app.post("/exercises/", (_req, _res) => {
    const { target, daily_exercises } = _req.body;
    if (typeof target === "number" && typeof daily_exercises === "object") {
        _res.send(calculateExercise(daily_exercises, target));
    } else {
        _res.json({
            error: "malformatted parameters",
        });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
