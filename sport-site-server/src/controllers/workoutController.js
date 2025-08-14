// routes/workout.routes.js

import express from "express";
import Workout from "../models/Workout.js";
import Exercise from "../models/Exercise.js";

const router = express.Router();

// POST /api/workouts
router.post("/create", async (req, res) => {
  console.log(req.body)
  try {
    const { type, exercises, owner } = req.body;
    console.log({ type, exercises, owner } )

    const newWorkout = new Workout({
      type,
      exercises,
      owner, // optional
    });

    console.log(newWorkout)

    await newWorkout.save();
    res.status(201).json(newWorkout);
  } catch (error) {
    console.error("Create workout error:", error);
    res.status(500).json({ message: "Failed to create workout." });
  }
});


router.get("/", async (req, res) => {
  try {
    const workouts = await Workout.find()
      .populate("exercises.exercise") // populate exercise details
      .populate("owner"); // optional
    console.log(workouts)
    res.json(workouts);
  } catch (error) {
    console.error("Get workouts error:", error);
    res.status(500).json({ message: "Failed to fetch workouts." });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const workoutId = req.params.id;
    const { type, exercises, owner } = req.body;

    const updatedWorkout = await Workout.findByIdAndUpdate(
      workoutId,
      { type, exercises, owner },
      { new: true, runValidators: true }
    );

    if (!updatedWorkout) {
      return res.status(404).json({ message: "Workout not found." });
    }

    res.json(updatedWorkout);
  } catch (error) {
    console.error("Update workout error:", error);
    res.status(500).json({ message: "Failed to update workout." });
  }
});

router.get("/:id", async (req, res) => {
 
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found." });
    }

    res.json(workout);
  } catch (error) {
    console.error("Get workout by ID error:", error);
    res.status(500).json({ message: "Failed to get workout." });
  }
});


router.get('/del/:id', async (req, res) => {
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    console.log(req.cookies)
      console.log("BBBBBBBBBBBBBBBB")

  // try {
  //   const workoutId = req.params.id;

  //   const deletedWorkout = await Workout.findByIdAndDelete(workoutId);

  //   if (!deletedWorkout) {
  //     return res.status(404).json({ message: 'Workout not found.' });
  //   }

  //   res.json({ message: 'Workout deleted successfully.' });
  // } catch (error) {
  //   console.error('Delete workout error:', error);
  //   res.status(500).json({ message: 'Failed to delete workout.' });
  // }
});


router.get("/exercise", async(req, res) => {
    try {

        const exercises = await Exercise.find()
        res.json(exercises);


    } catch (error){
    
        console.error("exercise error:", error);
    res.status(500).json({ message: "Failed to fetch exercise." });
    }
     
  });

export default router;
