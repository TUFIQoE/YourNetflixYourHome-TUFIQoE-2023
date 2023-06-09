import { useDispatch } from "react-redux";
import { ChromeStorage } from "../../../utils/custom/ChromeStorage";
import Button from "./common/Button/Button";
import React from "react";
import { Dispatch } from "redux";
import { T_EXPERIMENT_SETUP_ACTIONS } from "../redux/actions/experimentSetupActions";


const ConfigurationEraseButton = () => {
    const dispatch = useDispatch<Dispatch<T_EXPERIMENT_SETUP_ACTIONS>>()

    const handleErase = async () => {
        await ChromeStorage.update_experiment_settings_property("videos", [])
        dispatch({type: "SET_EXPERIMENT_SETUP", key: "config_valid", payload: false})
    }

    return(
        <Button text="Erase" handleClick={handleErase} style={{backgroundColor: "#a4243bff", width: "auto", padding: "10px 25px", marginTop: "5px"}}/>
    )
}

export default ConfigurationEraseButton