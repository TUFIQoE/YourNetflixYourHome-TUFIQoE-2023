import { useEffect } from "react"
import { useSelector } from "react-redux"
import { T_APP_STATE } from "../redux/reducers"
import { useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { ChromeStorage } from "../../../utils/custom/ChromeStorage"
import { remove_whitespaces } from "../../../utils/string_utils"
import { T_STARTUP_FORM_ACTIONS } from "../redux/actions/startupFormActions"




export const useSubjectIDInput = () => {
    const {subject_id} = useSelector((state:T_APP_STATE) => state.startupForm)
    const dispatch = useDispatch<Dispatch<T_STARTUP_FORM_ACTIONS>>()

    useEffect(() => {
        const init = async () => {
            const settings = await ChromeStorage.get_experiment_settings()
            dispatch({type:"SET_STARTUP_FORM", key:"subject_id", payload: settings.subject_id})
        }
        init()
    }, [])


    const handleChange = async (value:string) => {
        const id = remove_whitespaces(value)
        dispatch({type:"SET_STARTUP_FORM", key:"subject_id", payload: id})
        await ChromeStorage.update_experiment_settings_property("subject_id", id)
    }


    return {
        subject_id: subject_id,
        handleChange
    }
}