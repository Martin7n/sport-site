import Exercise from '../models/Exercise.js';
import complexService from '../services/complexService.js';



const exercises = [{
        "type": "basic",
        "category": "lower",
        "name": "squat",
        "subcategory": "lower"
        },

        {
        "type": "basic",
        "category": "push",
        "name": "bench",
        "subcategory": "push"
        },
        {
        "type": "basic",
        "category": "pull",
        "name": "pull up",
        "subcategory": "pull"
        },
        {
        "type": "auxilary",
        "category": "fullbody",
        "name": "run 100m",
        "subcategory": "condition"
        },
        {
        "type": "auxilary",
        "category": "fullbody",
        "name": "Cindy WOD: Pull-Ups, Push-Ups, Air Squats 5-10-15",
        "subcategory": "condition"
        },
        {
        "type": "basic",
        "category": "push",
        "name": "military press",
        "subcategory": "push"
    }]

     
export async function seedData() {
  const countExercises = await Exercise.countDocuments();

  if (countExercises === 0) {
    try {
      for (const ex of exercises) {
        await Exercise.create(ex);  
      }

      console.log("All exercises seeded successfully.");
    } catch (err) {
      console.error("Seeding failed:", err);
    }
  } else {
    console.log("Exercises already exist in the database. Skipping seeding.");
  }

  for (let index = 0; index < 10; index++) {
      await complexService.createComplex();

  }
  
};