import { useEffect, useState } from "react"
import { ChromeStorage } from "../../../../utils/custom/ChromeStorage"
import { validateMappingAvailable } from "../../../../utils/validation/validate-mapping-available"
import { useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { T_EXPERIMENT_SETUP_ACTIONS } from "../../redux/actions/experimentSetupActions"
import { T_EXPERIMENT_SETUP } from "../../redux/types"



export const useURLInput = () => {
    const [urls, setUrls] = useState<string[]>([])
    const dispatch = useDispatch<Dispatch<T_EXPERIMENT_SETUP_ACTIONS>>()

    // Init state with persistent values from ChromeStorage
    useEffect(() => {
        const init = async () => {
            const {urls:_urls} = await ChromeStorage.get_experiment_settings()
            setUrls(_urls)
        }
        init()
    }, [])

    // Update ChromeStorage after every urls update
    useEffect(() => {
        ChromeStorage.update_experiment_settings_property("urls", urls)
        const mappingAvailable = validateMappingAvailable(urls)
        dispatch({type: "SET_EXPERIMENT_SETUP", key: "mapping_available", payload: mappingAvailable})
    }, [urls])

    const handleUrlChange = async (value: string, index: number) => {
        const tmp = [...urls]
        tmp[index] = value
        setUrls(tmp)
    }
    const handleUrlAdd = async () => {
        const tmp = [...urls]
        tmp.push("")
        setUrls(tmp)
    }
    const handleUrlDelete = async (index: number) => {
        const tmp = [...urls]
        tmp.splice(index, 1)
        setUrls(tmp)
    }

    return {
        urls,
        handleUrlChange, handleUrlAdd, handleUrlDelete
    }
}