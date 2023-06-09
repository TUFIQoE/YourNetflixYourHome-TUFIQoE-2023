import React from "react";
import style from "./style.module.scss"
import Input from "../common/Input/Input";
import Select from "../common/Select/Select";
import { useSubjectIDInput } from "../../hooks/useSubjectIDInput";


const ExperimentSetupForm = () => {
    const {subject_id, handleChange:handleSubjectIDChange} = useSubjectIDInput()

    return(
        <div className={style.experimentSetupForm}>
            <Select id="device_id" label="Device ID" options={[{label: "106", value: 106}, {label: "107", value: 107}]}/>
        
            <div className={style.wrapper}>
               <Input label="Subject ID" value={subject_id} handleChange={handleSubjectIDChange} style={{width: "50%"}}/>
               <Select id="session_type" label="Session type" options={[{label: "alone", value: "alone"}, {label: "together", value: "together"}]} style={{width: "40%"}}/>
            </div>
        </div>
        
    )
}


export default ExperimentSetupForm