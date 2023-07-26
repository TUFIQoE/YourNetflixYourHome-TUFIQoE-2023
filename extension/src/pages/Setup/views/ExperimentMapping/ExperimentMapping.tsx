import React from "react";
import style from "./style.module.scss"


const ExperimentMapping = () => {

    return(
        <div className={style.experiment_mapping}>
            <span className={style.header}>Trwa konfigurowanie sesji, proszę czekać</span>
            <span className={style.sub_header}>Po zakończeniu konfiguracji nastąpi przekierowanie</span>
        </div>
    )
}

export default ExperimentMapping