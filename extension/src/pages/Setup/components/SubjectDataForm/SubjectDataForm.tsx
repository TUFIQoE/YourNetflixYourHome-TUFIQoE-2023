import React from "react";
import style from "./style.module.scss"
import Input from "../common/Input/Input";
import Select from "../common/Select/Select";
import { useSubjectAgeInput } from "../../hooks/useSubjectAgenput";

const SubjectDataForm = () => {
    const {subject_age, handleChange:handleAgeChange} = useSubjectAgeInput()

    return(
        <div className={style.subjectDataForm}>
            <Input label="Subject Age" value={subject_age} handleChange={handleAgeChange}/>
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
                label="Content chooser"
                id="subject_selected_content"
                options={[{label: "Subject", value: true},{label: "Admin", value: false}]}
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