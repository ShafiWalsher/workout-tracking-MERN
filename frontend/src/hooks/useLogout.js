import { useAuthContext } from "./useAuthContext";
import { useWorkoutContext } from "./useWorkoutContext";

export const useLogout = () => {
    const { dispatch: userDispatch } = useAuthContext();
    const { dispatch: workoutDispatch } = useWorkoutContext();


    const logout = () => {

        // remove user from local storage
        localStorage.removeItem('user');
        
        // disptch logout action
        userDispatch({type: 'LOGOUT'});
        workoutDispatch({type: 'SET_WORKOUTS', paylod: null});
    }

    return {logout};
}