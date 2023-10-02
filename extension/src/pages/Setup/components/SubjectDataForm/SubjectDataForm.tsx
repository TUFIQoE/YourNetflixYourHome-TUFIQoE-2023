import React from "react";
import style from "./style.module.scss"
import Input from "../common/Input/Input";
import Select from "../common/Select/Select";
import {useSubjectAgeInput} from "../../hooks/useSubjectAgenput";
import {useSubjectIDInput} from "../../hooks/useSubjectIDInput";


const SubjectDataForm = () => {
    // const experiment_id: number = await get_experiment_id()
    const {secret_word, handleChange:handleSubjectIDChange} = useSubjectIDInput()
    const {subject_age, handleChange:handleAgeChange} = useSubjectAgeInput()

    return(
        <div className={style.subjectDataForm}>
            <div className={style.wrapper}>
                <Input label="Klucz" value={secret_word} handleChange={handleSubjectIDChange} style={{width: "50%"}}/>
                <Input label="Wiek" value={subject_age} handleChange={handleAgeChange} style={{width: "50%"}}/>
            </div>

            <Select
                label="Płeć"
                id="subject_sex"
                options={[{label: "Mężczyzna", value:"male"},{label: "Kobieta", value:"female"},{label: "Wolę nie ujawniać", value:"undisclosed"}]}
            />
            <Select 
                label="Czy jesteś zaznajomiony z platformą Netflix?"
                id="subject_netflix_familiarity"
                options={[{label: "Tak", value:true},{label: "Nie", value:false}]}
            />
            <Select
                label="Kontynuujesz oglądanie produkcji?"
                id="content_continuation"
                options={[{label: "Tak", value: true},{label: "Nie", value: false}]}
            />
        </div>
    )
}




export default SubjectDataForm