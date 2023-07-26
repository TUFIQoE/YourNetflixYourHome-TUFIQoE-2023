import React from "react";
import style from "./style.module.scss"
import Header from "../../components/Header/Header";
import ConfigurationStatus from "../../components/ConfigurationStatus/ConfigurationStatus";
import ConfigurationEraseButton from "../../components/ConfigurationEraseButton";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { useEffect } from "react";
import { validateExperimentConfig } from "../../../../utils/validation/validate-experiment-config";
import { ChromeStorage } from "../../../../utils/custom/ChromeStorage";
import { T_APP_STATE } from "../../redux/reducers";
import { T_EXPERIMENT_SETUP_ACTIONS } from "../../redux/actions/experimentSetupActions";
import Dropzone from "../../components/Dropzone/Dropzone";
import SubjectDataForm from "../../components/SubjectDataForm/SubjectDataForm";
import ExperimentStartButton from "../../components/ExperimentStartButton";

import { validateStartupForm } from "../../../../utils/validation/validate-startup-form";


const Experiment = () => {
    const experimentSetup = useSelector((state:T_APP_STATE) => state.experimentSetup)
    const startupForm = useSelector((state:T_APP_STATE) => state.startupForm)
    const dispatch = useDispatch<Dispatch<T_EXPERIMENT_SETUP_ACTIONS>>() 

    useEffect(() => {
        const init = async () => {
            const settings = await ChromeStorage.get_experiment_settings()
            const valid = validateExperimentConfig(settings.videos)
            dispatch({type:"SET_EXPERIMENT_SETUP", key: "config_valid", payload: valid})
        }
        
        init()
    }, [])

    useEffect(() => {
        const validate = async () => {
            const s = await ChromeStorage.get_experiment_settings()
            const valid = await validateStartupForm()
            dispatch({type: "SET_EXPERIMENT_SETUP", key: "experiment_start_available", payload: valid})
        }

        validate()
    }, [startupForm])

    

    return(
        <div className={style.experiment}>
            <div className={style.container}>
                <div className={style.wrapper}>
                        <Header>YourNetflixOurLab Experiment</Header>
                        <Header style={{fontSize: 20, opacity: 0.8}}>{"Experiment setup"}</Header>
                    </div>
                    <div className={style.wrapper}>
                        <ConfigurationStatus />
                        {
                            experimentSetup.config_valid ? <ConfigurationEraseButton /> : <Dropzone />
                        }
                    </div>
                    <div className={style.wrapper}>
                        <SubjectDataForm />
                    </div>
                    <div className={style.wrapper}>
                        <ExperimentStartButton />
                    </div>
            </div>
        </div>
    )
}


export default Experiment