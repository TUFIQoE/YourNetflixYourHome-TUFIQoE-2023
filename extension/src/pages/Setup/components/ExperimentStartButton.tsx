import React, { useEffect, useLayoutEffect, useState } from "react";
import Button from "./common/Button/Button";
import { useExperimentStart } from "../hooks/useExperimentStart";
import { useSelector } from "react-redux";
import { T_APP_STATE } from "../redux/reducers";

const ExperimentStartButton = () => {
    const {start_experiment} = useExperimentStart()
    const {experiment_start_available, config_valid} = useSelector((state:T_APP_STATE) => state.experimentSetup)

    return(
        <Button 
            text="Start experiment"
            disabled={!experiment_start_available || !config_valid}
            //attributes={{disabled: !setup.experimentAvailable || !subjectID}}
            handleClick={start_experiment}
        />
    )
}

export default ExperimentStartButton