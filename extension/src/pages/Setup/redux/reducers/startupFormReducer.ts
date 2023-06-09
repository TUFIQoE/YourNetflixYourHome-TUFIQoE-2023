import { T_STARTUP_FORM_ACTIONS } from "../actions/startupFormActions";
import { T_EXPERIMENT_SETUP, T_STARTUP_FORM } from "../types";

const initialState: T_STARTUP_FORM = {
    subject_id: "",
    device_id: "",
    subject_age: "",
    session_type: "",
    subject_sex: "",
    subject_netflix_familiarity: "",
    subject_selected_content: "",
    content_continuation: ""
}


const startupFormReducer = (state:T_STARTUP_FORM = initialState, action: T_STARTUP_FORM_ACTIONS) => {
    switch(action.type){
        case 'SET_STARTUP_FORM':
            const tmp = {...state}
            tmp[action.key] = action.payload
            return tmp
        default:
            return state
    }
}

export default startupFormReducer