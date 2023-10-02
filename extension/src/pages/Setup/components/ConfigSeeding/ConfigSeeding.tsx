import React from "react";
import style from "./style.module.scss"
import Input from "../common/Input/Input";
import { useSubjectIDInput } from "../../hooks/useSubjectIDInput";
import { useConfigSeeding } from "./useConfigSeeding";


const ConfigSeeding = () => {
    const {secret_word, handleChange:handleIDChange} = useSubjectIDInput()
    const {seeding, handleChange:handleMirroringChange} = useConfigSeeding()

    return(
        <div className={style.configMirroring}>
            <div className={style.wrapper}>
                <span className={style.text}>Use config seeding:</span>
                <input type="checkbox" className={style.checkbox} checked={seeding} onChange={e => handleMirroringChange(e.currentTarget.checked)}/>
            </div>
            {
                seeding ? <div className={style.wrapper}>
                <Input label="SecretW ord" value={secret_word} handleChange={handleIDChange}/>
            </div> : null
            }
           
        </div>
    )
}

export default ConfigSeeding