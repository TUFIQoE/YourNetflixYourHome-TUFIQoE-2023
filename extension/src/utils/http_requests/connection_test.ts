import axios from "axios"
import {  backend_urls } from "./config"


export const test_server_connection = async () : Promise<boolean> => {
    try{
        const response = await axios.get(backend_urls.connection_test)
        return response.status === 200;
    }
    catch(err){
        console.log(err)
        return false
    }
}