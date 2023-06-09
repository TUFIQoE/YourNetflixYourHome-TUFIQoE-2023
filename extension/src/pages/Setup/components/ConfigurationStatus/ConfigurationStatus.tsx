import React from "react"
import style from "./style.module.scss"
import { useSelector } from "react-redux"
import Header from "../Header/Header"
import { T_APP_STATE } from "../../redux/reducers"

const ConfigurationStatus = () => {
    const setup = useSelector((state:T_APP_STATE) => state.experimentSetup)
    return(
        <div className={style.configurationStatus}>
            <Header style={{fontSize: 20}}>Configuration status: <span className={style.status}>{setup.config_valid ? "detected" : "not detected"}</span></Header>
        </div>
    )
}


export default ConfigurationStatus