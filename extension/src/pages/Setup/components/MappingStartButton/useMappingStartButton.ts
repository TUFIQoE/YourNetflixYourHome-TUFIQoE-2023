import { ChromeStorage } from "../../../../utils/custom/ChromeStorage"


export const useMappingStartButton = () => {
   

    const handleMappingStart = async () => {
        const settings = await ChromeStorage.get_experiment_settings()
        const variables = await ChromeStorage.get_experiment_variables()

        variables.extension_mode = "mapping"
        variables.extension_running = true
        const url = settings.urls[variables.video_index]

        await ChromeStorage.set_experiment_variables(variables)
        window.location.href = url 
    }

    return {
        handleMappingStart,
       
    }
}