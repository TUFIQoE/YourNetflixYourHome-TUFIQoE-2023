import axios from "axios"
import { T_EXPERIMENT_SETTINGS} from "../../config/storage.config"
import { backend_urls } from "./config"

type T_INPUT_DATA = {
    started : string,
    // subject_id : T_EXPERIMENT_SETTINGS["subject_id"]
    // device_id : T_EXPERIMENT_SETTINGS["device_id"]
    // session_type : T_EXPERIMENT_SETTINGS["session_type"]

    subject_age : T_EXPERIMENT_SETTINGS["subject_age"]
    subject_sex : T_EXPERIMENT_SETTINGS["subject_sex"]
    subject_netflix_familiarity : T_EXPERIMENT_SETTINGS["subject_netflix_familiarity"]
    // subject_selected_content : T_EXPERIMENT_SETTINGS["subject_selected_content"]
    content_continuation : T_EXPERIMENT_SETTINGS["content_continuation"]

    videos : string
    urls : string
    settings: string
}

export const post_new_experiment = async (data : T_INPUT_DATA) : Promise<number|null> => {
    try{
        const response = await axios.post(backend_urls.experiment, data)
        return response.data.experiment_id
    }catch(err : any){
        if (err.response) {
            // The client was given an error response (5xx, 4xx)
        } else if (err.request) {
            // The client never received a response, and the request was never left
        } else {
            // Anything else
        }
        return null
    }
}



