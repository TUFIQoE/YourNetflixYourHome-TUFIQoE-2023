import { combineReducers } from "redux";
import experimentSetupReducer from "./experimentSetupReducer";
import startupFormReducer from "./startupFormReducer";

const rootReducer = combineReducers({
    experimentSetup: experimentSetupReducer,
    startupForm: startupFormReducer
})


export type T_APP_STATE = ReturnType<typeof rootReducer>
export default rootReducer