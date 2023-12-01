// import { useEffect, useState } from "react";
import { useEffect } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {

    // const [workouts, setWorkouts] = useState(null)
    const {workouts, dispatch} = useWorkoutContext()


    useEffect( () => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts');
            const json = await response.json();

            if(response.ok){
                // setWorkouts(json);
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        fetchWorkouts()
    }, [dispatch]) //dependancy array

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => {
                    return (
                        <WorkoutDetails key={workout._id} workout={workout}/>
                    );
                })}
            </div>
            <WorkoutForm/>
        </div>
    );
}
 
export default Home;