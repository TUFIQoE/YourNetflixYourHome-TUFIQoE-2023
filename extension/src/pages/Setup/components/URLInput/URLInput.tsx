import React from "react";
import style from "./style.module.scss"
import { useURLInput } from "./useURLInput";

const URLInput = () => {
    const {urls, handleUrlAdd, handleUrlChange, handleUrlDelete} = useURLInput()

    return(
        <div className={style.urlInput}>
            {
                urls.map((url, index) => {
                    return (
                        <div className={style.urlWrapper} key={index}>
                            <input className={style.url} value={url} onChange={e => handleUrlChange(e.currentTarget.value, index)} />
                            <div className={style.delete} onClick={e => handleUrlDelete(index)}>X</div>
                        </div> 
                    )
                })
            }
            <button onClick={handleUrlAdd} className={style.addUrl}>Dodaj link</button>
        </div>
    )
}


export default URLInput