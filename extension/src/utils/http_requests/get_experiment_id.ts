import axios from "axios"
import { backend_urls } from "./config"

export const get_experiment_id = async () : Promise<number> => {
    try{
        const response = await axios.get(backend_urls.id)
        return response.data
    }catch(err : any){
        if (err.response) {
            // The client was given an error response (5xx, 4xx)
        } else if (err.request) {
            // The client never received a response, and the request was never left
        } else {
            // Anything else
        }
        return 0
    }
}



