// routes/workout.routes.js

import express from "express";
import Workout from "../models/Workout.js";
import Exercise from "../models/Exercise.js";

const router = express.Router();

// POST /api/workouts
router.post("/create", async (req, res) => {
  try {
    const { type, exercises, owner } = req.body;

    const newWorkout = new Workout({
      type,
      exercises,
      owner, // optional
    });

    await newWorkout.save();
    res.status(201).json(newWorkout);
  } catch (error) {
    console.error("Create workout error:", error);
    res.status(500).json({ message: "Failed to create workout." });
  }
});


router.get("/", async (req, res) => {
  try {
    // const workouts = await Workout.find()
    //   .populate("exercises.exercise") // populate exercise details
    //   .populate("owner"); // optional

    const workouts = [
        {
  "type": "Upper Body",
  "owner": "64b7f24c8e...",
  "exercises": [
    {
      "exercise": "64b7f1e23f...",
      "name":"press",
      "sets": [
        { "reps": 10, "weight": 50 },
        { "reps": 8, "weight": 55 },
        { "reps": 6, "weight": 60 }
      ]
    },
    {
      "exercise": "64b7f1f44c...",
      "name":"deadlift",
      "sets": [
        { "reps": 12 },
        { "reps": 12 },
        { "reps": 12 }
      ]
    },
    {
      "exercise": "64b7f1f44c...",
      "name":"deadlift",
      "sets": [
        { "reps": 12 },
        { "reps": 12 },
        { "reps": 12 }
      ]
    },
    {
      "exercise": "64b7f1f44c...",
      "name":"deadlift",
      "sets": [
        { "reps": 12 },
        { "reps": 12 },
        { "reps": 12 }
      ]
    }
  ]
},{
  "type": "Upper Body",
  "owner": "64b7f24c8e...",
  "exercises": [
    {
      "exercise": "64b7f1e23f...",
      "name":"press",
      "sets": [
        { "reps": 10, "weight": 50 },
        { "reps": 8, "weight": 55 },
        { "reps": 6, "weight": 60 }
      ]
    },
    {
      "exercise": "64b7f1f44c...",
      "name":"deadlift",
      "sets": [
        { "reps": 12 },
        { "reps": 12 },
        { "reps": 12 }
      ]
    },
    {
      "exercise": "64b7f1f44c...",
      "name":"deadlift",
      "sets": [
        { "reps": 12 },
        { "reps": 12 },
        { "reps": 12 }
      ]
    },
    {
      "exercise": "64b7f1f44c...",
      "name":"deadlift",
      "sets": [
        { "reps": 12 },
        { "reps": 12 },
        { "reps": 12 }
      ]
    }
  ]
}]
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
