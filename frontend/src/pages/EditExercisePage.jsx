import "../App.css";
import { useNavigate } from "react-router";
import {useEffect, useState} from "react";

function EditExercisePage({exerciseToEdit}) {
    const [name, setName] = useState();
    const [reps, setReps] = useState();
    const [weight, setWeight] = useState();
    const [unit, setUnit] = useState();
    const [date, setDate] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        getExercise();
    }, []);

    const getExercise = async () => {

        const response = await fetch(
            `/exercises/${exerciseToEdit._id}`, { method: "GET" }
        )
        const exercise = await response.json();
        setName(exercise.name);
        setReps(exercise.reps);
        setWeight(exercise.weight);
        setUnit(exercise.unit);
        setDate(exercise.date);
    }

    const editExercise = async () => {
        const editedExercise = { name, reps, weight, unit, date };
        const response = await fetch(
            `/exercises/${exerciseToEdit._id}`, {
            method: "PUT",
            body: JSON.stringify(editedExercise),
            headers: { "Content-Type": "application/json" }
        });

        if (response.status === 200) {
            alert("Exercises edited successfully.");
        } else {
            alert(`Failed to edit exercise, status code = ${response.status}`);
        }
        navigate("/");
    };

    return (
        <div>
            <h1>Edit Exercise</h1>
            <label>Exercise Name:</label>
            <input
                name="name"
                type="text"
                value={name || ""} onChange={e => setName(e.target.value)}
            />
            <label>Reps:</label>
            <input
                name="reps"
                type="text"
                value={reps || ""} onChange={e => setReps(e.target.value)}
            />
            <label>Weight:</label>
            <input
                name="weight"
                type="text"
                value={weight || ""} onChange={e => setWeight(e.target.value)}
            />
            <label>Units:</label>
            <select
                name="units"
                id="units"
                onChange={e => setUnit(e.target.value)}>
                <option value="lbs">lbs</option>
                <option value="kgs">kgs</option>
            </select>
            <label>Date:</label>
            <input
                name="date"
                type="text"
                value={date || ""} onChange={e => setDate(e.target.value)}
            />
            <button
                onClick={editExercise}
            >Update</button>
        </div>
    );
}

export default EditExercisePage;