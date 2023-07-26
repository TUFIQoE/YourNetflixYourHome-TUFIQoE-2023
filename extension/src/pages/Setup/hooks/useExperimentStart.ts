import { ChromeStorage } from "../../../utils/custom/ChromeStorage"
import { post_new_experiment } from "../../../utils/http_requests/post_new_experiment"
import { get_local_datetime } from "../../../utils/time_utils"
import { post_new_video } from "../../../utils/http_requests/post_new_video"
import { useState } from "react"

export const useExperimentStart = () => {
    const [experimentStarting, setExperimentStarting] = useState(false)

    const start_experiment = async () : Promise<void> => {
        const settings = await ChromeStorage.get_experiment_settings()
        const variables = await ChromeStorage.get_experiment_variables()

        const timestamp = get_local_datetime(new Date())

        setExperimentStarting(true)

        // Create new experiment entry in database
        const database_experiment_id = await post_new_experiment({
            started: timestamp,

            subject_age: settings.subject_age,
            subject_sex: settings.subject_sex,
            subject_netflix_familiarity: settings.subject_netflix_familiarity,
            content_continuation: settings.content_continuation,

            urls: JSON.stringify(settings.urls),
            videos: JSON.stringify(settings.videos),
            settings: JSON.stringify(settings)
        })
        if(database_experiment_id == null){
            setExperimentStarting(false)
            window.alert("Could not create experiment entry. Check server connection.")
            return
        }

        // Update experiment id variable
        await ChromeStorage.update_experiment_variables_property("database_experiment_id", database_experiment_id)
        
        // Create new video entry in database
        const database_video_id = await post_new_video({
            started: timestamp,
            experiment_id: database_experiment_id as number,
            url: settings.videos[variables.video_index].url as string
        })

        if(database_video_id == null){
            setExperimentStarting(false)
            window.alert("Could not create video entry. Check server connection.")
            return
        }

        // Update video id variable
        await ChromeStorage.update_experiment_variables_property("database_video_id", database_video_id)

        // Start experiment
        await ChromeStorage.update_experiment_variables_property("extension_mode", "main")
        await ChromeStorage.update_experiment_variables_property("extension_running", true)
        window.location.href = settings.videos[variables.video_index].url 
    }


    return {
        experimentStarting,
        start_experiment
    }
}