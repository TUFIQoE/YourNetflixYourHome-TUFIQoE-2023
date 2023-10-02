import React from "react";
import NavButton from "../../components/NavButton";
import style from "./style.module.scss"


const Main = () => {
    return(
        <div className={style.main}>
            <div className={style.container}>
                <span className={style.header}>Eksperyment YourNetflixYourHome</span>
                <span className={style.sub_header}>Co chcesz zrobić?</span>

                <div className={style.btn_container}>
                    <NavButton text="Konfiguracja" to="configuration"/>
                    <NavButton text="Eksperyment" to="experiment"/>
                    <NavButton text="O nas" to="about"/>
                </div>
            </div>
        </div>
    )
}

export default Main