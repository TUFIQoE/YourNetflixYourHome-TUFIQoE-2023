import React from "react"
import style from "./style.module.scss"


const NumberPicker = () => {
 


    return(
        <div className={style.numberPicker}>
            
            <div className={style.display}>

            </div>
            <div className={style.wrapper}>
                <button>-</button>
                <button>+</button>
            </div>
        </div>
    )

    
}

export default NumberPicker