import React from "react"
import style from "./style.module.scss"
import { HTMLAttributes } from "react"

interface I_ATTRIBUTES extends HTMLAttributes<HTMLSpanElement> {
    size: "small" | "medium" | "large",
    [key: string]: any,
}

type T_PROPS = {
    style?: React.CSSProperties,
    children: React.ReactNode
}

const Header = ({children, ...props} : T_PROPS) => {
    
    return(
        <span className={style.header} style={props.style}> {children} </span>
    )
}


export default Header