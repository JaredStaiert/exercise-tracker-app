import mongoose from "mongoose";
import "dotenv/config";

let connection = undefined;
let Exercise = undefined;

const COLLECTION_NAME = "exercises";

/**
 * Method connects to the mongoose server specified in .env MONGODB_CONNECT_STRING
 * @param {boolean} dropCollection If true, the collection is dropped and rebuilt
 * @returns {Promise<void>}
 */
async function connect(dropCollection) {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        connection = mongoose.connection;
        console.log("MongoDB Connected");
        if (dropCollection) {
            await connection.db.dropCollection(COLLECTION_NAME);
        }
        Exercise = createModel();
        await connection.db.collection("exercises").createIndex(
            { name: 1, reps: 1, weight: 1, unit: 1, date: 1}, { unique: true });
    } catch (e) {
        console.log(e);
        throw Error(`Could not connect to MongoDB ${e.message}`);
    }
}

function createModel() {
    const userSchema = mongoose.Schema({
        name: {type: String, required: true},
        reps: {type: Number, required: true},
        weight: {type: Number, required: true},
        unit: {type: String, required: true},
        date: {type: String, required: true},
    },
        {collection: COLLECTION_NAME}
    );
    return mongoose.model("Exercise", userSchema);
}

async function postExercise(exercise) {
    const newExercise = {
            name: exercise.name,
            reps: exercise.reps,
            weight: exercise.weight,
            unit: exercise.unit,
            date: exercise.date
        };
    await Exercise.insertOne(newExercise);
    return newExercise;
}

async function getExercisesByFilter(filter) {
    const queryResult = await Exercise.find(filter).exec();

    //Only want to return array of objects when filter criteria returns multiple objects.
    if (queryResult.length === 1) {
        return queryResult[0];
    }
    return queryResult;
}

async function getExerciseByID(exerciseID) {
    const objectId = new mongoose.Types.ObjectId(exerciseID);
    return await Exercise.findById(objectId).exec();
}

async function updateExercise(exerciseID, updateInfo) {
    return await Exercise.updateOne({ _id: exerciseID }, updateInfo);
}

async function deleteExercise(exerciseID) {
    return await Exercise.deleteMany({ _id: exerciseID });
}

export { connect, postExercise, getExercisesByFilter, getExerciseByID, updateExercise, deleteExercise };