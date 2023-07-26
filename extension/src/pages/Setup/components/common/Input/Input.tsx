import React from "react";
import style from "./style.module.scss"


type T_PROPS = {
    label: string
    type?: string
    value: string | number
    handleChange: (value:string) => void
    style?: Object
    disabled?: boolean
}

const Input = (props : T_PROPS) => {

    return(
        <div className={style.wrapper} style={props.style}>
            <span className={style.label}>{props.label}</span>
            <input 
                className={style.input}
                type={props.type}
                value={props.value}
                onChange={(e) => props.handleChange(e.currentTarget.value)}
                placeholder={props.label}
                disabled={props.disabled}
            />
        </div>
        
    )
}


export default Input