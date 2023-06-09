import React, { ChangeEvent, useEffect } from "react";
import style from "./style.module.scss"
import { ChromeStorage } from "../../../../../utils/custom/ChromeStorage";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { T_STARTUP_FORM_ACTIONS } from "../../../redux/actions/startupFormActions";
import { useSelector } from "react-redux";
import { T_APP_STATE } from "../../../redux/reducers";
import { T_STARTUP_FORM } from "../../../redux/types";



type T_PROPS = {
    id: keyof T_STARTUP_FORM
    label?: string
    options: Array<{label:string, value:string|number|boolean}>
    style?: Object
}

const Select = (props:T_PROPS) => {
    const dispatch = useDispatch<Dispatch<T_STARTUP_FORM_ACTIONS>>()
    const startupForm = useSelector((state:T_APP_STATE) => state.startupForm)
   

    const handleChange = async (e:ChangeEvent<HTMLSelectElement>) => {
        const _value = e.target.value
        dispatch({type: "SET_STARTUP_FORM", key: props.id, payload: _value})
        await ChromeStorage.update_experiment_settings_property(props.id, _value)
    }

    useEffect(() => {
        const init = async () => {
            const settings = await ChromeStorage.get_experiment_settings()
            dispatch({type: "SET_STARTUP_FORM", key: props.id, payload: settings[props.id]})
        }
        init()
    }, [])

    return(
        <div className={style.select_container} style={props.style}>
            <span className={style.label}>{props.label}</span>
            <select className={style.select} onChange={handleChange} value={startupForm[props.id]}>
                <option disabled value="" >...</option>
                {
                    props.options.map((option,index) => {
                        return <option key={index} value={option.value.toString()}>{option.label}</option>
                    })
                }
            </select>
        </div>
    )
}


export default Select