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
                    Projekt: „W kierunku lepszego zrozumienia czynników wpływających na QoE poprzez bardziej ekologicznie uzasadnione standardy oceny”; akronim TUFIQoE numer rejestracyjny 2019/34/H/ST6/00599 uzyskał dofinansowanie w ramach projektów badawczych konkursu polsko-norweskiego GRIEG finansowanych z Norweskiego Mechanizmu Finansowego na lata 2014-2021.
                </span>
                <button className={style.return_btn} onClick={() => {navigate("/", {replace: true})}}>Powrót</button>
            </div>
        </div>
        </>   
    )
}

export default About