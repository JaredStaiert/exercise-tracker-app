import '../App.css';
import { FaSave } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

function ExerciseItem({ exercise, onDelete, onEdit }) {

    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td>
                <FaGear onClick={e => {e.preventDefault(); onEdit(exercise)}}></FaGear>
            </td>
            <td>
                <MdDelete onClick={e => {e.preventDefault(); onDelete(exercise._id)}}></MdDelete>
            </td>
        </tr>
    );
}

export default ExerciseItem;