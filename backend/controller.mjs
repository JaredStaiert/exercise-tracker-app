import "dotenv/config";
import express from "express";
import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import * as exercises from "./exercise_model.mjs";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.post("/exercises",
    body("name").notEmpty().isString(),
    body("reps").notEmpty().isInt({ gt: 0 }),
    body("weight").notEmpty().isInt({ gt: 0 }),
    body("unit").notEmpty().isString().isIn(["kgs", "lbs"]),
    body("date").notEmpty().isString().matches(/^\d{2}-\d{2}-\d{2}$/),
    asyncHandler(async (req, res) => {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ Error: "Invalid request" });
        } else {
            // POST and then return created object as response
            const existing = await exercises.getExercisesByFilter(req.body);
            if (existing.length === 0) {
                const exercise = await exercises.postExercise(req.body);
                const response = await exercises.getExercisesByFilter(exercise);
                res.status(201).json(response);
            } else {
                res.status(403).json({message: "Exercise already exists"});
            }
        }
    })
);

app.get("/exercises/:_id", asyncHandler(async (req, res) => {
    const response = await exercises.getExerciseByID(req.params._id);
    if (response === null) {
        res.status(404).json({ Error: "Not found"});
    } else {
        res.status(200).json(response);
    }
}));

app.get("/exercises", asyncHandler(async (req, res) => {
    const response = await exercises.getExercisesByFilter();
    res.status(200).json(response);
}));

app.put("/exercises/:_id",
    body("name").notEmpty().isString(),
    body("reps").notEmpty().isInt({ gt: 0 }),
    body("weight").notEmpty().isInt({ gt: 0 }),
    body("unit").notEmpty().isString().isIn(["kgs", "lbs"]),
    body("date").notEmpty().isString().matches(/^\d{2}-\d{2}-\d{2}$/),
    asyncHandler(async (req, res) => {
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ Error: "Invalid request" });
        } else {
            const documentToUpdate = await exercises.getExerciseByID(req.params._id);
            if (documentToUpdate === null) {
                res.status(404).json({Error: "Not found"});
            } else {
                await exercises.updateExercise(req.params._id, req.body);
                const updated = await exercises.getExerciseByID(req.params._id);
                res.status(200).json(updated);
            }
        }
}));

app.delete("/exercises/:_id", asyncHandler(async (req, res) => {
    const document = await exercises.getExerciseByID(req.params._id);
    if (document === null) {
        res.status(404).json({ Error: "Not found"});
    } else {
        await exercises.deleteExercise(req.params._id);
        res.status(204).send();
    }
}))

app.listen(PORT, async () => {
    await exercises.connect(true);
    console.log(`Server listening on port ${PORT}`);
});
