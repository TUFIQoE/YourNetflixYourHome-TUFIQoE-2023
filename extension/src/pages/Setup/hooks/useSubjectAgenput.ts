import { useEffect, useState } from "react"
import { ChromeStorage } from "../../../utils/custom/ChromeStorage"
import { ChangeEvent } from "react"
import { T_APP_STATE } from "../redux/reducers"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { T_STARTUP_FORM_ACTIONS } from "../redux/actions/startupFormActions"

export const useSubjectAgeInput = () => {
    const {subject_age} = useSelector((state:T_APP_STATE) => state.startupForm)
    const dispatch = useDispatch<Dispatch<T_STARTUP_FORM_ACTIONS>>()

    useEffect(() => {
        const init = async () => {
            const {subject_age:age} = await ChromeStorage.get_experiment_settings()
            dispatch({type:"SET_STARTUP_FORM", key: "subject_age", payload: age})
        }
        init()
    }, [])

    const handleChange = async (_value:string) => {
        const value = Number(_value)
        if(value < 0) return;
        if(isNaN(value) === true) return;

        dispatch({type:"SET_STARTUP_FORM", key: "subject_age", payload: value})
        await update_storage(value)
    }

    const update_storage = async (value:number) => {
        const settings = await ChromeStorage.get_experiment_settings()
        settings.subject_age = value
        await ChromeStorage.set_experiment_settings(settings)
    }


    return {
        subject_age,
        handleChange
    }
}