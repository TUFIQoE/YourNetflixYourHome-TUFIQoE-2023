import React from "react";
import NavButton from "../../components/NavButton";
import style from "./style.module.scss"


const Main = () => {
    return(
        <div className={style.main}>
            <div className={style.container}>
                <span className={style.header}>YourNetflixOurLab Experiment</span>
                <span className={style.sub_header}>What would you like to do?</span>

                <div className={style.btn_container}>
                    <NavButton text="Configuration" to="configuration"/>
                    <NavButton text="Experiment" to="experiment"/>
                    <NavButton text="About" to="about"/>
                </div>
            </div>
        </div>
    )
}

export default Main