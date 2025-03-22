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
        await popDummyData();
    } catch (e) {
        console.log(e);
        throw Error(`Could not connect to MongoDB ${e.message}`);
    }
}

/**
 * Method defines the schema for mongoose
 * @returns mongoose model schema (should be assigned to mongoose model class (Exercise in this case))
 */
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

/**
 * Method creates initial items to showcase app features.
 * @returns {Promise<void>}
 */
async function popDummyData() {
    const names = ["Deadlift", "Squat", "Bench Press", "Bicep Curl"];
    const reps = [12, 13, 14, 15];
    const weights = [30, 35, 40, 45];
    const units = ["kgs", "lbs", "kgs", "lbs"];
    const dates = ["03-01-2025", "03-02-15", "04-07-42", "08-09-97"];

    try {
        for (let i = 0; i < 5; i++) {
            const newExercise = {
                name: names[i],
                reps: reps[i],
                weight: weights[i],
                unit: units[i],
                date: dates[i],
            }
            await Exercise.insertOne(newExercise);
        }
        console.log("Dummy data populated successfully");
    } catch (e) {
        console.log("Error populating initial dummy data");
    }
}

/**
 * Method posts provided data to new document in database.
 * @param exercise
 * @returns {Promise<{name, reps: (number|{type: Number | NumberConstructor, required: boolean}|*), weight: (number|number|string|*), unit: *, date}>}
 */
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

/**
 * Method retrieves document(s) from db using provided filter
 * @param filter
 * @returns {Promise<*>}
 */
async function getExercisesByFilter(filter) {
    const queryResult = await Exercise.find(filter).exec();

    //Only want to return array of objects when filter criteria returns multiple objects.
    if (queryResult.length === 1) {
        return queryResult[0];
    }
    return queryResult;
}

/**
 * Method retrieves document(s) from db using provided id.
 * @param exerciseID
 * @returns {Promise<*>}
 */
async function getExerciseByID(exerciseID) {
    const objectId = new mongoose.Types.ObjectId(exerciseID);
    return await Exercise.findById(objectId).exec();
}

/**
 * Method updates properties of document with provided id using provided info.
 * @param exerciseID
 * @param updateInfo
 * @returns {Promise<*>}
 */
async function updateExercise(exerciseID, updateInfo) {
    return await Exercise.updateOne({ _id: exerciseID }, updateInfo);
}

/**
 * Method deletes document from db using provided id.
 * @param exerciseID
 * @returns {Promise<*>}
 */
async function deleteExercise(exerciseID) {
    return await Exercise.deleteMany({ _id: exerciseID });
}

export { connect, postExercise, getExercisesByFilter, getExerciseByID, updateExercise, deleteExercise };