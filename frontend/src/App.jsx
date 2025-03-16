import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import AddExercisePage from './pages/AddExercisePage.jsx';
import EditExercisePage from './pages/EditExercisePage.jsx';
import Navigation from "./components/Navigation.jsx"

function App() {

    const [exerciseToEdit, setExerciseToEdit] = useState("");

    return (
    <div className="app">
        <Router>
            <Navigation />
          <Routes>
            <Route path="/" element={<HomePage
                exerciseToEdit={exerciseToEdit} setExerciseToEdit={setExerciseToEdit}/>}></Route>
            <Route path="/add-exercise" element={<AddExercisePage />}></Route>
            <Route path="/edit" element={<EditExercisePage
                exerciseToEdit={exerciseToEdit} setExerciseToEdit={setExerciseToEdit}/>}></Route>
          </Routes>
        </Router>
    </div>
    );
}

export default App;