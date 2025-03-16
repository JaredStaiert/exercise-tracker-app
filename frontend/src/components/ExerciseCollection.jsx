import '../App.css';
import ExerciseItem from './ExerciseItem.jsx';

function ExerciseCollection({ exercises, onEdit, onDelete }) {
    return (
        <table className="collection-container">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
            {exercises.map((exercise, i) => <ExerciseItem exercise={exercise} onDelete={onDelete} onEdit={onEdit} key={i} />)}
            </tbody>
        </table>

    );
}

export default ExerciseCollection;