import React, { useLayoutEffect, useState } from "react";
import style from "./style.module.scss"

import Button from "../common/Button/Button";
import ExperimentStartButton from "../ExperimentStartButton";
import { useScheduleExperiment} from "./useScheduleExperiment";
import { CircularProgress } from "@mui/material";

import { useSelector } from "react-redux";
import { T_APP_STATE } from "../../redux/reducers";
import { createPortal } from "react-dom";


const Scheduler = () => {
    const {handle_time_change, handle_schedule, init, time, progress, scheduled} = useScheduleExperiment()
    const {experiment_start_available, config_valid} = useSelector((state:T_APP_STATE) => state.experimentSetup)

    const portalRoot = document.getElementById("app-container")

    useLayoutEffect(() => {
        init()
    }, [])

    return(
        <div className={style.scheduler}>
            {
                scheduled ? 
                createPortal(<div className={style.shutter}>
                    <div className={style.shutter_inner}>
                        <CircularProgress value={progress} variant={"determinate"} size={60}/>
                    </div>
                </div>, portalRoot!) : null
            }
            <span className={style.header}>Schedule auto-start</span>
            <input className={style.input} type="time" onChange={handle_time_change} value={`${time.hours}:${time.minutes}`}/>

            <div className={style.wrapper}>
                <Button text="Schedule auto-start" handleClick={handle_schedule} style={{backgroundColor: "#00A896"}} disabled={!experiment_start_available || !config_valid}/>
                <ExperimentStartButton />
            </div>
            
        </div>
    )
}




export default Scheduler