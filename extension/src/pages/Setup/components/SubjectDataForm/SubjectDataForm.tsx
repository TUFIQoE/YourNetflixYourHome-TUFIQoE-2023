import React from "react";
import style from "./style.module.scss"
import Input from "../common/Input/Input";
import Select from "../common/Select/Select";
import {useSubjectAgeInput} from "../../hooks/useSubjectAgenput";
import {useSubjectIDInput} from "../../hooks/useSubjectIDInput";


const SubjectDataForm = () => {
    // const experiment_id: number = await get_experiment_id()
    const {subject_id, handleChange:handleSubjectIDChange} = useSubjectIDInput()
    const {subject_age, handleChange:handleAgeChange} = useSubjectAgeInput()

    return(
        <div className={style.subjectDataForm}>
            <div className={style.wrapper}>
                <Input label="Subject ID" value={subject_id} handleChange={handleSubjectIDChange} style={{width: "50%"}} disabled={true}/>
                <Input label="Subject Age" value={subject_age} handleChange={handleAgeChange} style={{width: "50%"}}/>
            </div>

            <Select
                label="Subject sex"
                id="subject_sex"
                options={[{label: "Male", value:"male"},{label: "Female", value:"female"},{label: "Prefer not to disclose", value:"undisclosed"}]}
            />
            <Select 
                label="Netflix familiarity"
                id="subject_netflix_familiarity"
                options={[{label: "Yes", value:true},{label: "No", value:false}]}
            />
            <Select
                label="Content continuation"
                id="content_continuation"
                options={[{label: "Yes", value: true},{label: "No", value: false}]}
            />
        </div>
    )
}




export default SubjectDataForm