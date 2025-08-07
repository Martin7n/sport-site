
// import { Schema, model, Types } from "mongoose";
// import { minMaxLenValidator } from "../utils/validators.js";



// const workoutSchema = new Schema({

//         type:          { type: String, required: true, validate: minMaxLenValidator(2) },
//         exercises:     [{ type:Types.ObjectId, ref: "Exercise"}],
//         // image:          { type: String, required: true, 
//         //                 validate: {
//         //                 validator: 
//         //                 val => /^https?:\/\//.test(val),
//         //                 message: (props) => `${props.value} is invalid image url!`
//         //              a   }
//         // },
//         likes:          [{ type:Types.ObjectId, ref: "User"}],
//         owner:          { type: Types.ObjectId, ref: "User", required: false }
    
//     },
//           {
//             timestamps: true
//           }
//     );

// const Workout = model("Workout", complexSchema);

// export default Workout;



import { Schema, model, Types } from "mongoose";

const setSchema = new Schema({
  reps: { type: Number, required: true },
  weight: { type: Number, required: false }, // Optional weight
}, { _id: false }); // No _id for subdocs if not needed

const workoutExerciseSchema = new Schema({
  exercise: { type: Types.ObjectId, ref: "Exercise", required: true },
  sets: [setSchema],
}, { _id: false });

const workoutSchema = new Schema({
  type: { type: String, required: true },
  exercises: [workoutExerciseSchema],
  owner: { type: Types.ObjectId, ref: "User", required: false }
}, {
  timestamps: true
});

const Workout = model("Workout", workoutSchema);

export default Workout;




//example

// {
//   "type": "Upper Body",
//   "owner": "64b7f24c8e...",
//   "exercises": [
//     {
//       "exercise": "64b7f1e23f...",
//       "sets": [
//         { "reps": 10, "weight": 50 },
//         { "reps": 8, "weight": 55 },
//         { "reps": 6, "weight": 60 }
//       ]
//     },
//     {
//       "exercise": "64b7f1f44c...",
//       "sets": [
//         { "reps": 12 },
//         { "reps": 12 },
//         { "reps": 12 }
//       ]
//     }
//   ]
// }

    

