// import { useEffect, useState } from "react";
import { useEffect } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {

    // const [workouts, setWorkouts] = useState(null)
    const {workouts, dispatch} = useWorkoutContext()
    const {user} = useAuthContext()

    useEffect( () => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                }
            });
            const json = await response.json();

            if(response.ok){
                // setWorkouts(json);
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        if (user){
            fetchWorkouts()
        }
    }, [dispatch, user]) //dependancy array

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