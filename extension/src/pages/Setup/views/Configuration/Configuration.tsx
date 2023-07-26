import React, { useEffect } from "react";
import style from "./style.module.scss"
import Header from "../../components/Header/Header";
import ConfigurationStatus from "../../components/ConfigurationStatus/ConfigurationStatus";
import ConfigurationEraseButton from "../../components/ConfigurationEraseButton";
import { useSelector } from "react-redux";
import { T_APP_STATE } from "../../redux/reducers";

import URLInput from "../../components/URLInput/URLInput";
import ConfigSeeding from "../../components/ConfigSeeding/ConfigSeeding";
import MappingStartButton from "../../components/MappingStartButton/MappingStartButton";
import { ChromeStorage } from "../../../../utils/custom/ChromeStorage";
import { validateExperimentConfig } from "../../../../utils/validation/validate-experiment-config";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { T_EXPERIMENT_SETUP_ACTIONS } from "../../redux/actions/experimentSetupActions";


const Configuration = () => {
    const setup = useSelector((state:T_APP_STATE) => state.experimentSetup)
    const dispatch = useDispatch<Dispatch<T_EXPERIMENT_SETUP_ACTIONS>>()

    useEffect(() => {
        const init = async () => {
            const settings = await ChromeStorage.get_experiment_settings()
            console.log(settings)
            const valid = validateExperimentConfig(settings.videos)
            dispatch({type:"SET_EXPERIMENT_SETUP", key: "config_valid", payload: valid})
        }

        init()
    }, [])

    return(
        <div className={style.configuration}>
            <div className={style.container}>
                <div className={style.wrapper}>
                    <Header>YourNetflixOurLab Experiment</Header>
                    <Header style={{fontSize: 20, opacity: 0.8}}>{"Bitrate <-> VMAF mapping"}</Header>
                </div>
                <div className={style.wrapper}>
                    <ConfigurationStatus />
                    {
                        setup.config_valid ? <ConfigurationEraseButton /> : null
                    }
                </div>
                <div className={style.wrapper}>
                    {/*<ConfigSeeding />*/}
                    <URLInput />
                </div>
                <div className={style.wrapper}>
                    <MappingStartButton />
                </div>
                
            </div>
            
        </div>
    )
}


export default Configuration