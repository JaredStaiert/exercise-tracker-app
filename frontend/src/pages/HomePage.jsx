import { Link } from 'react-router-dom';
import ExerciseCollection from '../components/ExerciseCollection.jsx';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegSquarePlus } from "react-icons/fa6";

function HomePage({setExerciseToEdit}) {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadExercises();
    }, []);

    const loadExercises = async () => {
        const response = await fetch("/exercises", { method: "GET" });
        const exercises = await response.json();
        setExercises(exercises);
    }

    const onEdit = (exercise) => {
        setExerciseToEdit(exercise);
        navigate("/edit");
    }

    const onDelete = async (_id) => {
        const response = await fetch(
            `/exercises/${_id}`,
            { method: 'DELETE' }
        );
        if (response.status === 204) {
            setExercises(exercises.filter( e => e._id !== _id));
        } else {
            alert(`Exercise NOT deleted with _id = ${_id} STATUS CODE = ${response.status}`);
        }
    }

    return (
        <div>
            <h2>List of Exercises</h2>
            <ExerciseCollection exercises={exercises} onEdit={onEdit} onDelete={onDelete}></ExerciseCollection>
            <Link to="/add-exercise">
                <FaRegSquarePlus size={40}>Add an exercise</FaRegSquarePlus>
            </Link>
        </div>
    );
}

export default HomePage;