import { useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { T_EXPERIMENT_SETUP_ACTIONS } from "../../redux/actions/experimentSetupActions"
import { useSelector } from "react-redux"
import { T_APP_STATE } from "../../redux/reducers"
import { ChromeStorage } from "../../../../utils/custom/ChromeStorage"
import { useEffect } from "react"


export const useConfigSeeding = () => {
    const dispatch = useDispatch<Dispatch<T_EXPERIMENT_SETUP_ACTIONS>>()
    const {seeding} = useSelector((state:T_APP_STATE) => state.experimentSetup)

    useEffect(() => {
        const init = async () => {
            const {config_seeding} = await ChromeStorage.get_experiment_settings()
            dispatch({type: "SET_EXPERIMENT_SETUP", key: "seeding", payload: config_seeding})
        }
        init()
    }, [])

    const handleChange = async (checked: boolean) => {
        dispatch({type:"SET_EXPERIMENT_SETUP", key: "seeding", payload: checked})
        await ChromeStorage.update_experiment_settings_property("config_seeding", checked)
    }

    return {
        seeding,
        handleChange
    }
}   