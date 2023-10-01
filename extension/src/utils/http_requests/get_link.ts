import axios from "axios"
import { backend_urls } from "./config"


type T_DATA = {
    experiment_id: number
}

export const get_link = async (data:T_DATA) : Promise<string> => {
    try{
        const response = await axios.post(backend_urls.link, data)
        return response.data
    }catch(err : any){
        if (err.response) {
            // The client was given an error response (5xx, 4xx)
        } else if (err.request) {
            // The client never received a response, and the request was never left
        } else {
            // Anything else
        }
        return 'error'
    }
}



