import React, {useEffect, useState} from "react";
import {ChromeStorage} from "../../../../utils/custom/ChromeStorage";
import style from "./style.module.scss"
import {get_link} from "../../../../utils/http_requests/get_link";


const ExperimentFinished = () => {
    const [link, setLink] = useState('');

    useEffect( function () {
        const link_req = async () => {
            const {database_experiment_id} = await ChromeStorage.get_experiment_variables()

            const link = await get_link({experiment_id: database_experiment_id})

            setLink(link)

            ChromeStorage.initialize_default()
        }

        link_req()
            .catch(console.error);
    }, [])

    return(
        <div className={style.experiment_finished}>
            <span className={style.header}>Session ended</span>
            <span className={style.sub_header}>Thank you for participating in the experiment</span>
            <span className={style.sub_header}>Please click the link and complete the questionnaire</span>
            <span className={style.sub_header}><a href={link}>Questionnaire</a></span>
        </div>
    )
}

export default ExperimentFinished