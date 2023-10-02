import { useEffect } from "react"
import { useSelector } from "react-redux"
import { T_APP_STATE } from "../redux/reducers"
import { useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { ChromeStorage } from "../../../utils/custom/ChromeStorage"
import { remove_whitespaces } from "../../../utils/string_utils"
import { T_STARTUP_FORM_ACTIONS } from "../redux/actions/startupFormActions"
import {get_experiment_id} from "../../../utils/http_requests/get_experiment_id";



export const useSubjectIDInput = () => {
    const {secret_word} = useSelector((state:T_APP_STATE) => state.startupForm)
    const dispatch = useDispatch<Dispatch<T_STARTUP_FORM_ACTIONS>>()

    useEffect(() => {
        const init = async () => {
            const settings = await ChromeStorage.get_experiment_settings()
            dispatch({type:"SET_STARTUP_FORM", key:"secret_word", payload: settings.secret_word})

            const id = await get_experiment_id()
            const secret_word = ''

            dispatch({type:"SET_STARTUP_FORM", key:"secret_word", payload: secret_word})
            await ChromeStorage.update_experiment_settings_property("subject_id", id)
            await ChromeStorage.update_experiment_settings_property("secret_word", secret_word)
        }
        init()
    }, [])


    const handleChange = async (value:string) => {
        const secret_word = remove_whitespaces(value)
        dispatch({type:"SET_STARTUP_FORM", key:"secret_word", payload: secret_word})
        await ChromeStorage.update_experiment_settings_property("secret_word", secret_word)
    }


    return {
        secret_word: secret_word,
        handleChange
    }
}