const express = require('express');
const {
    createNewWorkout,
    getWorkout,
    getAllWorkouts,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController');

const router = express.Router();


// GET all workouts
router.get('/', getAllWorkouts);

// GET a single workout
router.get('/:id', getWorkout);

// POST a new workouts
router.post('/', createNewWorkout)

// DELETE a workouts
router.delete('/:id', deleteWorkout);

// UPDATE a workout
router.patch('/:id', updateWorkout);


module.exports = router;