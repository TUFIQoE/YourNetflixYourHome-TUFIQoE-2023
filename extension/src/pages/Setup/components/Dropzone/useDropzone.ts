import { DragEvent } from "react"
import { validateExperimentConfig } from "../../../../utils/validation/validate-experiment-config"
import { ChromeStorage } from "../../../../utils/custom/ChromeStorage"
import { useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { T_EXPERIMENT_SETUP_ACTIONS } from "../../redux/actions/experimentSetupActions"



export const useDropzone = () => {
    const dispatch = useDispatch<Dispatch<T_EXPERIMENT_SETUP_ACTIONS>>()


    const handleDragOver = (e : DragEvent) => {
        e.preventDefault()
    }
    const handleDragEnter = (e : DragEvent) => {
        e.currentTarget.setAttribute("dragover", "true")
    }
    const handleDragLeave = (e : DragEvent) => {
        e.currentTarget.removeAttribute("dragover")
    }

    const handleDrop = (e : DragEvent) => {
        e.currentTarget.removeAttribute("dragover")
        e.preventDefault()

        if (e.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            const file = e.dataTransfer.files[0]
            if(file != null && file.type !== 'application/json'){
                window.alert("Invalid type of file")
                return
            }

            const reader = new FileReader()
            reader.onload = async (e : ProgressEvent<FileReader>) : Promise<void> => {
                if(e.target == null){
                    console.error("File reader event target is null or undefined")
                    return
                }
                const config = JSON.parse(e.target.result as string)
                const isValid = validateExperimentConfig(config)
                if(isValid === true){
                    dispatch({type: "SET_EXPERIMENT_SETUP", key: "config_valid", payload: isValid})
                    await ChromeStorage.update_experiment_settings_property("videos", config)
                }
                else{
                    dispatch({type: "SET_EXPERIMENT_SETUP", key: "config_valid", payload: isValid})
                    window.alert("Provided file is incorrect")
                }
            }

            reader.readAsText(file)
        }
        else{
            console.log("Cannot handle file")
        }
    }


    return {
        handleDragEnter, handleDragLeave, handleDragOver, handleDrop
    }
}