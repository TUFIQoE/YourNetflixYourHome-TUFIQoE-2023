import React from "react";
import style from "./style.module.scss"

import logo from "../../../../assets/img/norway-grants-logo.png"
import { useNavigate } from "react-router";


const About = () => {
    const navigate = useNavigate()
    return(
        <>
        <div className={style.about}>
            <div className={style.wrapper}>
                <img className={style.logo} src={logo} alt=""/>
                <span className={style.description}>
                    Project: “Towards Better Understanding of Factors Influencing the QoE by More Ecologically-Valid Evaluation Standards”; acronym TUFIQoE registration number 2019/34/H/ST6/00599 obtained funding as part of the GRIEG Polish-Norwegian competition research projects financed from the Norwegian Financial Mechanism for 2014-2021
                </span>
                <button className={style.return_btn} onClick={() => {navigate("/", {replace: true})}}>Return</button>
            </div>
        </div>
        </>   
    )
}

export default About