import { useState } from 'react';
import { useNavigate } from "react-router";

function AddExercisePage() {
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch("/exercises", {
            method: "POST",
            body: JSON.stringify(newExercise),
            headers: { "Content-Type": "application/json" }
        });

        if (response.status === 201) {
            alert("Exercises added successfully.");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        navigate("/");
    };

    return (
        <div>
            <h1>Add Exercise</h1>
            <label>Exercise Name:</label>
            <input
                type="text"
                placeholder="Enter name here"
                value={name}
                onChange={e => setName(e.target.value)} />
            <label>Reps:</label>
            <input
                type="text"
                placeholder="Enter reps here"
                value={reps}
                onChange={e => setReps(e.target.value)} />
            <label>Weight:</label>
            <input
                type="text"
                placeholder="Enter weight here"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
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
                type="text"
                placeholder="Enter date here"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={addExercise}
            >Add</button>
        </div>
    );
}

export default AddExercisePage;