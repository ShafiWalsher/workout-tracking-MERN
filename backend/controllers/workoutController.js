const Workout = require('../models/workoutModel')
const mongoose = require('mongoose');

// get all workouts
const getAllWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1}); // -1 descending order
    return res.status(200).json(workouts);
}

// get a single workout
const getWorkout = async (req, res) => {
    const {id} = req.params; //get id from req url

    // check if {id} is valid or not
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such workout'})
    }

    const workout = await Workout.findById(id);
    
    if(!workout){
        return res.status(400).json({error: 'No such workout'});
    }

    return res.status(200).json(workout);
}

// create a new workout
const createNewWorkout = async (req, res) => {
    const {title, reps, load} = req.body;

    // add document to db
    try {
        const workout = await Workout.create({title, reps, load});
        return res.status(200).json(workout);
    } catch (error){
        return res.status(400).json({error: error.message});
    }
}


// delete a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params; //get id from req url

    // check if {id} is valid or not
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such workout'});
    }

    const workout = await Workout.findOneAndDelete({_id: id});

    if(!workout){
        return res.status(400).json({error: 'No such workout'});
    }

    return res.status(200).json(workout);
}

//update a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params; //get id from req url

    // check if {id} is valid or not
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such workout'});
    }

    const workout = await Workout.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!workout){
        return res.status(400).json({error: 'No such workout'});
    }

    return res.status(200).json(workout);
}


module.exports = {
    createNewWorkout,
    getWorkout,
    getAllWorkouts,
    deleteWorkout,
    updateWorkout
}